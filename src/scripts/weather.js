window.onload = () => {
  setInterval(getWeather(), 600 * 1000)

  function getWeather() {
    const weatherApiServer = 'http://140.238.195.23:8000/ruse/'
    let req = new XMLHttpRequest();

    req.open('GET', weatherApiServer)
    req.send()

    req.onreadystatechange = (e) => {
      let json = JSON.parse(req.responseText)
      console.log(json)
      document.getElementById('degrees').innerText = `${Math.floor(json.main.temp * 10) / 10}°C`
      document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`
    }
  }

  getWeather()
}