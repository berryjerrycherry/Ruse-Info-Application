const storage = require('electron-json-storage')
const os = require('os')
import { week } from './util.js'

storage.setDataPath(os.tmpdir())

setInterval(updateWeather(), 600 * 1000)

function updateWeather() {
  const weatherApiServer = 'http://140.238.195.23:8000/ruse/'
  let req = new XMLHttpRequest();

  req.open('GET', weatherApiServer)
  req.send()

  req.onreadystatechange = (e) => {
    if (req.responseText) {
      let json = JSON.parse(req.responseText)
      document.getElementById('degrees').innerText = `${Math.floor(json.main.temp * 10) / 10}°C`
      document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`
    }
  }
}

updateWeather()

setInterval(updateDayOfWeek, 15000);

function updateDayOfWeek() {
  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const d = new Date();
  let day = weekday[d.getDay()];
  document.getElementById("day").innerHTML = day;
}

updateDayOfWeek()

setInterval(updateDate, 15000);

function updateDate() {
  const timeNow = new Date()
  let year = timeNow.getFullYear()
  let day = timeNow.getDate()

  const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]

  const m = new Date()
  let month = months[m.getMonth()]

  let finaldate = `${day}/${month}/${year}`
  document.getElementById("date").innerText = finaldate
}

updateDate()

setInterval(updateTimeDisplay, 1000);

function updateTimeDisplay() {
  const timeNow = new Date()

  let hoursOfDay = timeNow.getHours()
  let minutes = timeNow.getMinutes()
  let seconds = timeNow.getSeconds()
  let period = "AM";

  if (hoursOfDay > 12) {
    hoursOfDay -= 12;
    period = "PM";
  }

  if (hoursOfDay === 0) {
    hoursOfDay = 12;
    period = "AM";
  }

  hoursOfDay = hoursOfDay < 10 ? "0" + hoursOfDay : hoursOfDay;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  let time = `${hoursOfDay}:${minutes} ${period}`;

  document.getElementById("clock").innerHTML = time;
}

updateTimeDisplay();

setInterval(updateClassesWidget, 10000)

function updateClassesWidget() {
  let today = new Date()
  let timetableData = storage.getSync('timetableData')
  let currentWeekLetter = week(today)

  timetableData[currentWeekLetter][today.getDay().toString()].forEach((period, i) => {
    let timestamp = new Date(period.timestamp)
    // Format time and subject
    document.getElementById(`class-${i + 1}`).innerText = `${timestamp.getHours()}:${timestamp.getMinutes().toString().length < 2 ? `0${timestamp.getMinutes()}`: timestamp.getMinutes()} · ${period.name.slice(0, period.name.indexOf(':'))}`
    // Format room location
    document.getElementById(`room-${i + 1}`).innerText = period.location.slice(period.location.indexOf(':') + 1, period.location.length).trim()
  })
}

updateClassesWidget()


setInterval(updateNextClassWidget, 1000)

function updateNextClassWidget() {
  let today = new Date()
  let timetableData = storage.getSync('timetableData')
  let currentWeekLetter = week(today)
  let dayOfWeek = today.getDay()

  if (dayOfWeek == 6 || dayOfWeek == 7) {

  } else {
    let closestPeriod = 1
    let periods = timetableData[currentWeekLetter][dayOfWeek.toString()]
    let now = Date.now()

    periods.forEach((period, i) => {
      let periodTimestamp = new Date(period.timestamp).getTime()

      if (now > periodTimestamp) {
        closestPeriod = i + 2;
      } else if (now < periodTimestamp) {
        closestPeriod = i + 1;
      } 
    })

    if (closestPeriod > 5) {
      let periods = timetableData[currentWeekLetter][(dayOfWeek + 1).toString()]
      let period = periods[0]
      let periodTimestamp = new Date(period.timestamp).getTime()
      let now = Date.now()
      
      document.getElementById('next-class-timer').innerText = formatTime(periodTimestamp - now)
      document.getElementById('next-class-text').innerText = period.name.replace(':', '·')

      let formattedTeacherName = (period.desc.slice(period.desc.indexOf(':') + 1, period.desc.length).trim())

      document.getElementById('next-class-teacher').innerText = formattedTeacherName.slice(formattedTeacherName, formattedTeacherName.indexOf('\n'))
      document.getElementById('next-class-room').innerText = period.location.slice(period.location.indexOf(':') + 1, period.location.length).trim()
    } else {
      let period = periods[closestPeriod.toString()]
      let periodTimestamp = new Date(period.timestamp).getTime()
      let now = Date.now()

      document.getElementById('next-class-timer').innerText = formatTime(periodTimestamp - now)
      document.getElementById('next-class-text').innerText = period.name.replace(':', '·')

      let formattedTeacherName = (period.desc.slice(period.desc.indexOf(':') + 1, period.desc.length).trim())

      document.getElementById('next-class-teacher').innerText = formattedTeacherName.slice(formattedTeacherName, formattedTeacherName.indexOf('\n'))
      document.getElementById('next-class-room').innerText = period.location.slice(period.location.indexOf(':') + 1, period.location.length).trim()
    }
  }
}

updateNextClassWidget()

function formatTime(ms) {
  let time = new Date(ms)
  let mins = time.getMinutes().toString()
  let secs = time.getSeconds().toString()
  return `${time.getHours() == 0 ? '' : `${time.getHours()}:`}${mins.length < 2 ? `0${mins}` : mins}:${secs.length < 2 ? `0${secs}` : secs}`
}