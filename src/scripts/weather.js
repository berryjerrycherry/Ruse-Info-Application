window.onload = () => {
  setInterval(getWeather(), 600 * 1000)

  function getWeather() {
    const weatherApiServer = 'http://140.238.195.23:8000/ruse/'
    let req = new XMLHttpRequest();

    req.open('GET', weatherApiServer)
    req.send()

    req.onreadystatechange = (e) => {
      alert(req.responseText)
      // let json = JSON.parse(req.responseText)
    }
  }

  getWeather()
}