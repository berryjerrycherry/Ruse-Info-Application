setInterval(todaysDay, 1000);

function todaysDay() {
  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const d = new Date();
  let day = weekday[d.getDay()];
  document.getElementById("day").innerHTML = day;
}

todaysDay();
