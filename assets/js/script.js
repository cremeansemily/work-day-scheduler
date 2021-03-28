var hour = {
  "8 AM": "",
  "9 AM": "",
  "10 AM": "",
  "11 AM": "",
  "12 PM": "",
  "1 PM": "",
  "2 PM": "",
  "3 PM": "",
  "4 PM": "",
  "5 PM": "",
};

function hourNumberFromHourString(hourString) {
  switch(hourString) {
    case "8 AM": return 8;
    case "9 AM": return 9;
    case "10 AM": return 10;
    case "11 AM": return 11;
    case "12 PM": return 12;
    case "1 PM": return 13;
    case "2 PM": return 14;
    case "3 PM": return 15;
    case "4 PM": return 16;
    case "5 PM": return 17;
  }
}

$(document).ready(function(){
  if(!localStorage.getItem('hour')) {
    updateCalendarTasks(hour);
  } else {
    updateCalendarTasks(JSON.parse(localStorage.getItem('hour')));
  }
})

$('#currentDay').text(moment().format('dddd') + ", " + moment().format('MMMM Do YYYY, h:mm a'));

var counter = 1;
for(const property in hour) {
  var textEntry = "#text-entry" + counter;
  $(textEntry).text(hour[property]);
  var timeId = "#time" + counter;
  var presentHour = moment().hour();
  var timeString = $(timeId).text();
  var timeNumber = hourNumberFromHourString(timeString);  
  if(timeNumber < presentHour) {
    $(textEntry).addClass("past");
  } else if (timeNumber > presentHour) {
    $(textEntry).addClass("future");
  } else {
    $(textEntry).addClass("present");
  }
  counter ++;
}

$("button").click(function() {
  value = $(this).siblings("textarea").val();
  hourString = $(this).siblings("div").text();
  
  saveSchedule(hourString, value);
});

function loadCorrectDataset() {
  result = localStorage.getItem('hour')
  return (result ? result : hour);
}

function initializeLocalStorage() {
  localStorage.setItem('hour', JSON.stringify(hour));
};

function saveToLocalStorage(dayObj) {
  localStorage.setItem('hour', JSON.stringify(dayObj));
}

function saveSchedule(hourString, val) {
  if(!localStorage.getItem('hour')) {
    initializeLocalStorage();
  }

  let workHours = JSON.parse(localStorage.getItem('hour'));
  workHours[hourString] = val

  saveToLocalStorage(workHours);
}

function updateCalendarTasks(dayObject) {
  $(".calendar-row").each(function(index) {
    var res = $(this).children("div");
    $(this).children("textarea").text(dayObject[res.text()]);
  })
}