document.getElementById("button-text").onclick = function() {loadPage()};
document.getElementById("closebutton").onclick = function() {closePage()};

function loadPage() {
  document.getElementById("note").style.display = "block"
}
function closePage() {
  document.getElementById("note").style.display = "none"
}
