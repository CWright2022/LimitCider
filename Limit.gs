/**
 * Code to disable the form if we go over the amount of cider
 * help from: https://stackoverflow.com/questions/48886503/how-to-limit-google-form-submissions-based-on-total-number-of-answers-not-number
 * by Cayden Wright
 * 9/4/2023
 */

function LimitCider() {
    //open form and sheet
    var form = FormApp.getActiveForm();
    var ss = SpreadsheetApp.openById("SHEET_ID");
    var sheet = ss.getSheetByName("Backend");

    //get limit
    sheet.setCurrentCell(sheet.getRange("A3"));
    var cell = sheet.getCurrentCell();
    var limit = cell.getValue();

    //get remaining
    sheet.setCurrentCell(sheet.getRange("A2"));
    cell = sheet.getCurrentCell();
    var remaining = cell.getValue();

    if(remaining<=0){
      form.setAcceptingResponses(false);
      form.setCustomClosedFormMessage("Unfortunately, all "+limit+" gallons of cider have been reserved.\nYou are still welcome to stop by to see if we have any extra!")
    }
}
