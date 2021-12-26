const ical = require('node-ical')

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
    );
  };
}

document.getElementById('file').onchange = fileSelected