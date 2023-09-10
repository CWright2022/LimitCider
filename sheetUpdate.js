/**
 * auto update form whenever spreadsheet is updated
 * allows for greater ease of use
 * 
 * by Cayden Wright
 * 9/4/2023
 */
function Update() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet=ss.getSheetByName("Backend");
  var form = FormApp.openById("FORM_ID");

  //get remaining
  sheet.setCurrentCell(sheet.getRange("A2"));
  cell = sheet.getCurrentCell();
  var remaining = cell.getValue();

  //get reserved
  sheet.setCurrentCell(sheet.getRange("A1"));
  cell = sheet.getCurrentCell();
  var reserved = cell.getValue();

  //live stats
  var items = form.getItems();
  var statsItem = items[1];
  statsItem.setHelpText("Gallons Remaining: "+remaining+"\nGallons Reserved: "+reserved);

  //re-open form if we increased the limit enough
  if(remaining>0){
    form.setAcceptingResponses(true);
  }
}
