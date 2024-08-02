const foldersIds = [DOCUMENTS_FOLDER_ID, PDFS_FOLDER_ID, DESTINATION_FOLDER_ID];

function trashFilesInsideFolder() {
  for (let i = 0; i < foldersIds.length; i++) {
    const folderId = foldersIds[i];
    const folder = DriveApp.getFolderById(folderId);

    while (folder.getFiles().hasNext()) {
      const file = folder.getFiles().next();
      Logger.log('Moving file to trash: ', file);
      file.setTrashed(true);
      // Delete File
      //Drive.Files.remove(file.getId())
    }
  }
}

function checkPermissions() {

}