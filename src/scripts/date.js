setInterval(theDate, 1000);

function theDate() {
  const timeNow = new Date();
  let year = timeNow.getFullYear();
  let day = timeNow.getDate();
 
  const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

  const m = new Date();
  let month = months[m.getMonth()];

finaldate = `${day}/${month}/${year}`
  document.getElementById("date").innerText = finaldate;
}

theDate();
