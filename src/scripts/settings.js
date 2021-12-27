const ical = require('node-ical')

console.log(getFirstMonday())

// Format of timetable data
/**
 * <week>:
 *    1: Array<PeriodData>
 *    2: Array<PeriodData>
 *    ...
 * 
 * PeriodData:
 *  summary : string
 *  desc: string
 *  timestamp: timestamp as iso string
 */

let timetableData = {
  A: {
    '1': [],
    '2': [],
    '3': [],
    '4': [],
    '5': []
  },
  B: {
    '1': [],
    '2': [],
    '3': [],
    '4': [],
    '5': []
  }
}


function fileSelected(event) {
  file = event.target.files[0]
  
  if (!file.path.endsWith('.ics')) {
    document.getElementById('timetable-status').innerText = 'Incorrect timetable format'
    return
  }

  const events = ical.sync.parseFile(file.path)
  for (const event of Object.values(events)) {
    let timestamp = new Date(event.start.toISOString())
    let timestampWeek = week(timestamp)

    let timetableDayData = timetableData[timestampWeek][timestamp.getDay().toString()]
    let alreadyExists = timetableDayData.find(data => data.timestamp == event.start.toISOString())

    // Limit each array to a length of 5 periods
    if (timetableDayData.length < 5 && !alreadyExists) {
      // Push timetable data
      timetableDayData.push({
        name: event.summary,
        desc: event.description,
        timestamp: event.start.toISOString() 
      })
    }
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