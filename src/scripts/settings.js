const ical = require('node-ical')

console.log(getFirstMonday())

function fileSelected(event) {
  file = event.target.files[0]
  
  if (!file.path.endsWith('.ics')) {
    document.getElementById('timetable-status').innerText = 'Incorrect timetable format'
    return
  }

  const events = ical.sync.parseFile(file.path)
  for (const event of Object.values(events)) {
    console.log(
        event.summary,
        event.description,
        event.start.toISOString() 
    )
  }

  console.log(week(new Date()))
}

document.getElementById('file').onchange = fileSelected

// Gets the date of the first monday in the current year
function getFirstMonday() {
  let date = new Date()
  date.setMonth(0)
  date.setDate(1)
  date.setHours(0, 0, 0, 0)

  while (date.getDay() !== 1) {
    date.setDate(date.getDate() + 1)
  }

  return date.getDate()
}

function daysFrom(date1, date2) {
  return (date1.getTime() - date2.getTime()) / (1000 * 3600 * 24)
}

// Determine Week A/B (Help from Joshua Koh)
let jan1 = new Date();
jan1.setMonth(0);
jan1.setDate(1);
jan1.setHours(0,0,0,0);

// Function to determine whether the day is in week A or week B
function week(day) {
  return (Math.floor((daysFrom(jan1, day) - getFirstMonday()) / 7) % 2) ? 'A' : 'B';
}