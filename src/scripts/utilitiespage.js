document.getElementById('button-text').onclick = function() {
  loadPage()
};
document.getElementById('closebutton').onclick = function() {
  closePage()
};
document.getElementById('back-button').onclick = function() {
  rememberSave()
};
document.getElementById('closebutton2').onclick = function() {
  closePage2()
};
document.getElementById('yes').onclick = function() {
  continueExit()
};


let btnClicked = false
let button = document.getElementById('save-button')
let buttonclicks = 0


button.onclick = () => {
  buttonclicks +=1
  btnClicked = true
  saveText()
}
let hasChanged = false
let changed = document.getElementById('maintextbox')
let changed2 = document.getElementById('title')
changed.addEventListener("input", () => {
  hasChanged = true
})
changed2.addEventListener("input", () => {
  hasChanged = true
})

function closePage2() {
  document.getElementById("warningmessage").style.display = 'none'
}


function loadPage() {
  document.getElementById("note").style.display = 'block'
}

function closePage() {
  document.getElementById("note").style.display = 'none'
}

function saveText() {
  let maintextbox = document.getElementById("maintextbox").value;
  let title = document.getElementById("title").value;
  let trim = title.trim();
  let length = trim.length
  localStorage.setItem('notes', maintextbox)
  localStorage.setItem('title', title)
  console.log(length)

  if (length == 0){
      let div = document.createElement('div');
      div.id = 'content';
      document.getElementById('fileselectarea').appendChild(div)
  }
  else if(buttonclicks == 1){
  let div = document.createElement('div');
  let text = document.createTextNode(`📄${title}`);
  div.id = 'content';
  div.style.color = "white";
  div.style.fontFamily = 'Noto Sans JP'
  div.appendChild(text);
  document.getElementById('fileselectarea').appendChild(div)
  }
  else if (buttonclicks > 1){
    let divid = document.getElementById('content')
    divid.remove()
    let div = document.createElement('div');
    let text = document.createTextNode(`📄${title}`);
    div.id = 'content';
    div.style.fontFamily = 'Noto Sans JP'
    div.style.color = "white";
    div.appendChild(text);
    document.getElementById('fileselectarea').appendChild(div)
  }


}
 maintextbox.value = localStorage.getItem('notes')
  title.value = localStorage.getItem('title')
function rememberSave() {
  let length = document.getElementById('maintextbox').value.length;
  if (btnClicked == true) {
      history.go(-1);
  } 
  else if (hasChanged == false) {
    history.go(-1);
  }
  else if (btnClicked == false) {
    document.getElementById("warningmessage").style.display = 'block'
  }
}

function continueExit() {
  history.go(-1);
}