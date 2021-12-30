const ical = require('node-ical')
const storage = require('electron-json-storage')
const os = require('os')

import { week, getFirstMonday } from './util.js'

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
 *  location: string
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

storage.setDataPath(os.tmpdir())


if (storage.getSync('timetableData')) {
  document.getElementById('timetable-status').innerText = `Timetable already added`
}


function fileSelected(event) {
  let file = event.target.files[0]
  
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
        timestamp: event.start.toISOString(),
        location: event.location
      })
    }
  }

  storage.set('timetableData', timetableData)

  document.getElementById('timetable-status').innerText = `Timetable selected: ${file.name}`
  console.log(timetableData)
}

document.getElementById('file').onchange = fileSelected