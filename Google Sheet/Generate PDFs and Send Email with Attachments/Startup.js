function onOpen() {
    const ui = SpreadsheetApp.getUi();
    const menu = ui.createMenu('Google App Scripts');
    menu.addItem('Generate Attachments', 'generatePDFs');
    menu.addItem('Send Emails', 'sendEmails')
    menu.addItem('Check Permissions', 'checkPermissions')
    menu.addItem('Trash Files', 'trashFilesInsideFolder')
    menu.addToUi()
}