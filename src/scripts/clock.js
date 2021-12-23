setInterval(displayTime, 1000);

function displayTime() {
  const timeNow = new Date();

  let hoursOfDay = timeNow.getHours();
  let minutes = timeNow.getMinutes();
  let seconds = timeNow.getSeconds();
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

displayTime();
