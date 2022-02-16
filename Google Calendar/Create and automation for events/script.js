let year = new Date().getFullYear();

function myFunction()
{
  let maxEmptyRows = 10;
  let spreadsheet = SpreadsheetApp.getActiveSheet();
  let calendarId = spreadsheet.getRange("B3").getValue();
  let eventCal = CalendarApp.getCalendarById(calendarId);

  let startDate = new Date(year + "/01/01");  
  let endDate = new Date(year + "/12/31");
  deleteEvents(eventCal, startDate, endDate)
  
  for(let i = 7, emptyRows = 0 ; i < spreadsheet.getMaxRows() && emptyRows < maxEmptyRows; i++)
  {
      let name = spreadsheet.getRange("B"+ i).getValue();
      let date = spreadsheet.getRange("A" + i).getValue();

      if(name === "" || date === "") {
        emptyRows++;        
      } else {
        emptyRows = 0;
      }
      var dateParts = date.split("/");
      dateParts.push(year);
      var dateValue = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
      eventCal.createAllDayEvent("Compleanno " + name, dateValue);
  }
  
}

function deleteEvents(calendar, startDate, endDate) {
    var events = calendar.getEvents(startDate, endDate);
    for(let i = 0; i < events.length; i++) {
      let event = events[i];
      if(event.getTitle().startsWith("Compleanno ")){
        event.deleteEvent();
      }
    }
}
