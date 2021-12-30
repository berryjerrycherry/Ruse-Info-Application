document.getElementById("button-text").onclick = function() {loadPage()};
document.getElementById("closebutton").onclick = function() {closePage()};
document.getElementById("save-button").onclick = function() {saveText()};
document.getElementById("back-button").onclick = function() {rememberSave()};
document.getElementById("closebutton2").onclick = function() {closePage2()};

let btnClicked = false

let button = document.getElementById('save-button')

button.onclick = () => {
  btnClicked = true
}



function closePage2() {
  document.getElementById("warningmessage").style.display = "none"
}


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
  let length = document.getElementById("maintextbox").value.length;
  if (btnClicked == true){
  history.go(-1);
  }
  else if (length > 0 && btnClicked == false) {
    document.getElementById("warningmessage").style.display = "block"
  }
}

