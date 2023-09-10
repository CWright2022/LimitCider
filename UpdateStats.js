/**
 * auto update form whenever spreadsheet is updated
 * allows for greater ease of use
 * 
 * by Cayden Wright
 * 9/4/2023
 */
function Update() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Backend");
  var form = FormApp.openById("SHEET_ID");

  //get limit
  sheet.setCurrentCell(sheet.getRange("A3"));
  cell = sheet.getCurrentCell();
  var limit = cell.getValue();

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
  statsItem.setHelpText("Gallons Remaining: " + remaining + "\nGallons Reserved: " + reserved);

  //re-open form if we increased the limit enough
  if (remaining > 0) {
    form.setAcceptingResponses(true);
  }

  //and close it if we decreased the limit
  if (remaining <= 0) {
    form.setAcceptingResponses(false);
    form.setCustomClosedFormMessage("Unfortunately, all " + limit + " gallons of cider have been reserved.\nYou are still welcome to stop by to see if we have any extra!")
  }
}