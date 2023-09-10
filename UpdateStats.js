/**
 * code to update live stats of how much cider we have sold/have left
 * 
 * by Cayden Wright
 */

function UpdateStats() {
    //open form and sheet
    var form = FormApp.getActiveForm();
    var ss = SpreadsheetApp.openById("SHEET_ID");
    var sheet = ss.getSheetByName("Backend");

    //get remaining
    sheet.setCurrentCell(sheet.getRange("A2"));
    cell = sheet.getCurrentCell();
    var remaining = cell.getValue();

    //get reserved
    sheet.setCurrentCell(sheet.getRange("A1"));
    cell = sheet.getCurrentCell();
    var reserved = cell.getValue();

    //get limit
    sheet.setCurrentCell(sheet.getRange("A3"));
    cell = sheet.getCurrentCell();
    var limit = cell.getValue();

    //update live stats
    var items = form.getItems();
    var statsItem = items[1];
    statsItem.setHelpText("Gallons Remaining: "+remaining+"\nGallons Reserved: "+reserved);

    //notify me at certain intervals
    var scriptProps = PropertiesService.getScriptProperties();
    var notifs = scriptProps.getProperty("notifs");
    

    if(notifs==0 && reserved>=limit*0.25){
      MailApp.sendEmail({
      to:"MY_EMAIL",
      subject:"Cider Alert: 1/4 reserved!",
      htmlBody: "<strong><h2>One quarter of the cider has been reserved!</strong></h2>Reserved:"+reserved+"<br>Remaining:"+remaining
      });
      notifs++
      scriptProps.setProperty("notifs", notifs);
    }

    if(notifs==1 && reserved>=limit*0.5){
      MailApp.sendEmail({
      to:"MY_EMAIL",
      subject:"Cider Alert: 1/2 reserved!",
      htmlBody: "<strong><h2>One half of the cider has been reserved!</strong></h2>Reserved:"+reserved+"<br>Remaining:"+remaining
    });
    notifs++
    scriptProps.setProperty("notifs", notifs);
    }

    if(notifs==2 && reserved>=limit*0.75){
      MailApp.sendEmail({
      to:"MY_EMAIL",
      subject:"Cider Alert: 3/4 reserved!",
      htmlBody: "<strong><h2>Three quarters of the cider has been reserved!</strong></h2>Reserved:"+reserved+"<br>Remaining:"+remaining
    });
    notifs++
    scriptProps.setProperty("notifs", notifs);
    }
    
    if(notifs==3 && reserved>=limit){
      MailApp.sendEmail({
      to:"MY_EMAIL",
      subject:"Cider Alert: All Gone!",
      htmlBody: "<strong><h2>All of the cider has been reserved!</strong></h2>Reserved:"+reserved+"<br>Remaining:"+remaining
    });
    notifs++
    scriptProps.setProperty("notifs",notifs);
    }
}
