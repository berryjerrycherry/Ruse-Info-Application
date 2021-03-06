const storage = require('electron-json-storage')
const os = require('os')
import { week, getDatesTime } from './util.js'

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
  let todaysDay = today.getDay()
  let timetableData = storage.getSync('timetableData')
  let currentWeekLetter = week(today)

  if (todaysDay == 6 || todaysDay == 0) {
    timetableData[invertWeek(currentWeekLetter)]['1'].forEach((period, i) => {
      let timestamp = new Date(period.timestamp)
  
      // Format time and subject
      document.getElementById(`class-${i + 1}`).innerText = `${timestamp.getHours()}:${timestamp.getMinutes().toString().length < 2 ? `0${timestamp.getMinutes()}`: timestamp.getMinutes()} · ${period.name.slice(0, period.name.indexOf(':'))}`
      // Format room location
      document.getElementById(`room-${i + 1}`).innerText = period.location.slice(period.location.indexOf(':') + 1, period.location.length).trim()
    })
  } else {
    timetableData[currentWeekLetter][todaysDay.toString()].forEach((period, i) => {
      let timestamp = new Date(period.timestamp)
  
      // Format time and subject
      document.getElementById(`class-${i + 1}`).innerText = `${timestamp.getHours()}:${timestamp.getMinutes().toString().length < 2 ? `0${timestamp.getMinutes()}`: timestamp.getMinutes()} · ${period.name.slice(0, period.name.indexOf(':'))}`
      // Format room location
      document.getElementById(`room-${i + 1}`).innerText = period.location.slice(period.location.indexOf(':') + 1, period.location.length).trim()
    })
  }
}

updateClassesWidget()

setInterval(updateNextClassWidget, 1000)

function updateNextClassWidget() {
  let today = new Date()
  let timetableData = storage.getSync('timetableData')
  let currentWeekLetter = week(today)
  let dayOfWeek = today.getDay()

  if (dayOfWeek == 6 || dayOfWeek == 0) {
    // If its Saturday or Sunday
    let nextMondayPeriods = timetableData[invertWeek(currentWeekLetter)]['1']

    let period = nextMondayPeriods[0]
    let periodTimestamp = incrementDays(dayOfWeek == 6 ? 2 : 1) + getDatesTime(new Date(period.timestamp))
    updatePeriod(period, periodTimestamp)
  } else {
    // If its a weekday

    // Get today's periods
    let todaysPeriods = timetableData[currentWeekLetter][dayOfWeek.toString()]
    let lastPeriod = todaysPeriods[todaysPeriods.length - 1]

    let todaysTime = getDatesTime(new Date())
    let lastPeriodTime = getDatesTime(new Date(lastPeriod.timestamp))

    // Check if the current time is later than the start of the last period
    if (todaysTime > lastPeriodTime) {
      // If the current time is later than the start of the last period
      if (dayOfWeek == 5) {
        // If today is a friday and lessons have already ended
        let nextMondayPeriods = timetableData[invertWeek(currentWeekLetter)]['1']

        let period = nextMondayPeriods[0]
        let periodTimestamp = incrementDays(3) + getDatesTime(new Date(period.timestamp))
        updatePeriod(period, periodTimestamp)
      } else {
        // If it is the end of another weekday and lessons have already ended

        let tmrwPeriods = timetableData[currentWeekLetter][(dayOfWeek + 1).toString()]
        
        let period = tmrwPeriods[0]
        let periodTimestamp = getTommorowStart() + getDatesTime(new Date(period.timestamp))
        updatePeriod(period, periodTimestamp)
      }
    } else {
      let nextPeriods = todaysPeriods.map(p => {
        let periodTimestamp = getDatesTime(new Date(p.timestamp))
        let now = getDatesTime(new Date())
        if (now < periodTimestamp) {
          return p
        }
      }).filter(t => t)

      let period = nextPeriods[0]
      let periodTimestamp = getTodayStart() + getDatesTime(new Date(period.timestamp))

      updatePeriod(period, periodTimestamp)
    }
  }
}

updateNextClassWidget()

function formatTime(ms) {
  let time = new Date(ms)
  let hours = Math.floor(time / 60 / 60 / 1000).toString()
  let mins = time.getMinutes().toString()
  let secs = time.getSeconds().toString()
  return `${hours == '0' ? '' : `${hours}:`}${mins.length < 2 ? `0${mins}` : mins}:${secs.length < 2 ? `0${secs}` : secs}`
}

function getTommorowStart() {
  let today = new Date()
  today.setDate(today.getDate() + 1)

  return today.setHours(0, 0, 0, 0)
}

function incrementDays(increment) {
  let today = new Date()
  today.setDate(today.getDate() + increment)

  return today.setHours(0, 0, 0, 0)
}

function updatePeriod(period, periodTimestamp) {
  document.getElementById('next-class-timer').innerText = formatTime(periodTimestamp - Date.now())
  if (period.name.length > 28) {
    document.getElementById('next-class-text').style.setProperty('font-size', '16px', 'important')
  }
  document.getElementById('next-class-text').innerText = period.name.replace(':', '·')

  let formattedTeacherName = (period.desc.slice(period.desc.indexOf(':') + 1, period.desc.length).trim())

  document.getElementById('next-class-teacher').innerText = formattedTeacherName.slice(formattedTeacherName, formattedTeacherName.indexOf('\n'))
  document.getElementById('next-class-room').innerText = period.location.slice(period.location.indexOf(':') + 1, period.location.length).trim()
}

function getTodayStart() {
  return (new Date()).setHours(0, 0, 0, 0)
}

function invertWeek(week) {
  if (week == 'A') {
    return 'B'
  } else {
    return 'A'
  }
}