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
}

document.getElementById('file').onchange = fileSelected

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


// Determine Week A/B (Help from Joshua Koh)

let today = new Date();
let jan1 = new Date();
jan1.setMonth(0);
jan1.setDate(1);
jan1.setHours(0,0,0,0);

function week() {
  return (Math.floor((daysFrom(jan1, today) - 2) / 7) % 2) ? 'A' : 'B';
}