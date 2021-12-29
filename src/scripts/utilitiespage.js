document.getElementById("button-text").onclick = function() {loadPage()};
document.getElementById("closebutton").onclick = function() {closePage()};
document.getElementById("save-button").onclick = function() {saveText()};

function loadPage() {
  document.getElementById("note").style.display = "block"
}
function closePage() {
  document.getElementById("note").style.display = "none"
}

function saveText() {
let maintextbox = document.getElementById("maintextbox").value;
localStorage.setItem("notes", maintextbox)
}
maintextbox.value = localStorage.getItem("notes")

function rememberSave() {
  let length = maintextbox.value.length
  if (length > 0) {
    console.log()
  }
}
