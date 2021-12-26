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

setInterval(updateDayOfWeek, 1000);

function updateDayOfWeek() {
  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const d = new Date();
  let day = weekday[d.getDay()];
  document.getElementById("day").innerHTML = day;
}

updateDayOfWeek()

setInterval(updateDate, 1000);

function updateDate() {
  const timeNow = new Date()
  let year = timeNow.getFullYear()
  let day = timeNow.getDate()

  const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]

  const m = new Date()
  let month = months[m.getMonth()]

  finaldate = `${day}/${month}/${year}`
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
