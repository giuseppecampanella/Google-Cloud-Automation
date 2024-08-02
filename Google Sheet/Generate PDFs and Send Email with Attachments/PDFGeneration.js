const DESTINATION_FOLDER_ID = 'id_taken_from_url';
const DOCUMENTS_FOLDER_ID = 'id_taken_from_url';
const PDFS_FOLDER_ID = 'id_taken_from_url';
const ATTACHMENT_TITLE = "Lettera Variazione_{path}_{full_name}";

const pairs = [
  { "googleDocTemplateId": "id_taken_from_url", "sheetName": "AUMENTO RAL" },
  { "googleDocTemplateId": "id_taken_from_url", "sheetName": "AUMENTO RAL+LIVELLO CCNL" },
  { "googleDocTemplateId": "id_taken_from_url", "sheetName": "AUMENTO RAL+LIVELLO CCNL+CAREER PATH" },
  { "googleDocTemplateId": "id_taken_from_url", "sheetName": "AUMENTO RAL+CAREER PATH" }
];

function generatePDFs() {
  for (let i = 0; i < pairs.length; i++) {
    generatePDFsForSpecificSheet(pairs[i].googleDocTemplateId, pairs[i].sheetName);
  }
}

function generatePDFsForSpecificSheet(googleDocTemplateId, sheetName) {
  const googleDocTemplate = DriveApp.getFileById(googleDocTemplateId);
  const destinationFolder = DriveApp.getFolderById(DESTINATION_FOLDER_ID);
  const docFolder = DriveApp.getFolderById(DOCUMENTS_FOLDER_ID);
  const pdfFolder = DriveApp.getFolderById(PDFS_FOLDER_ID);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  const rows = sheet.getDataRange().getValues();

  rows.forEach(function (row, index) {
    // skip header
    if (index === 0) return;
    // skip if a pdf was already created
    if (row[3] || row[4]) return;

    const attachmentName = ATTACHMENT_TITLE.replace("{path}", row[6]).replace("{full_name}", row[1]);
    const copy = googleDocTemplate.makeCopy(`${attachmentName}`, destinationFolder);
    const doc = DocumentApp.openById(copy.getId())
    const body = doc.getBody();

    body.replaceText('{{FULL_NAME}}', row[1]);
    body.replaceText('{{RAL}}', row[7]);
    body.replaceText('{{RAL_TO_LETTERS}}', convertNumberToWordsWithDecimals(row[7]));

    if (row.length >= 9 && row[8]) {
      body.replaceText('{{CLASSIFICATION}}', row[8]);
    }

    if (row.length >= 10 && row[9]) {
      body.replaceText('{{CAREER_PATH}}', row[9]);
    }

    doc.saveAndClose();

    var pdfFile = DriveApp.createFile(doc.getAs('application/pdf'));
    pdfFile.moveTo(pdfFolder);
    DriveApp.getFileById(doc.getId()).moveTo(docFolder);

    const url = pdfFile.getUrl();
    const id = pdfFile.getId();

    sheet.getRange(index + 1, 4).setValue(url)
    sheet.getRange(index + 1, 5).setValue(id)
  });
}