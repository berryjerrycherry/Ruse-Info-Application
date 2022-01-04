document.getElementById('closebutton').onclick = function() {
  closePage()
};
document.getElementById('back-button').onclick = function() {
  rememberSave()
};
document.getElementById('button-text').onclick = function() {
createFile()
};
document.getElementById('closebutton2').onclick = function() {
  closePage2()
};
document.getElementById('yes').onclick = function() {
  continueExit()
};
maintextbox.value = localStorage.getItem('notes')
title.value = localStorage.getItem('title')
window.onload = findfile();

document.getElementById('content').onclick = function() {
  loadPage()
};


let btnClicked = false
let button = document.getElementById('save-button')
let buttonclicks = 0


button.onclick = () => {
  buttonclicks += 1
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

function createFile() {
document.getElementById("visiblebase").style.display = 'none'
let div = document.createElement('div');
let textarea = document.createElement('textarea')
let button = document.createElement('button')
button.id = 'save-button'
div.id = 'notetesting'
textarea.id = 'testing'
div.style.position = 'fixed'
div.style.height = '83%'
div.style.width = '95%'
div.style.bottom = '1%'
div.style.margin = '20px'
div.style.backgroundColor = '#1C1E20'
div.style.borderRadius = '15px'
div.style.filter = 'drop-shadow(0px 2px 1px black)'
div.appendChild(textarea)
document.getElementById('rightframe').appendChild(div)
}

function findfile() {
  let title = document.getElementById("title").value;
  let trim = title.trim();
  let length = trim.length
  if (length == 0) {
    let div = document.createElement('div');
    div.id = 'content';
    document.getElementById('fileselectarea').appendChild(div)
  } else {
    let div = document.createElement('div');
    let text = document.createTextNode(`📄${title}`);
    div.id = 'content';
    text.id = 'filetext'
    div.style.color = "white";
    div.style.fontFamily = 'Noto Sans JP'
    div.style.position = 'absolute'
    div.style.top = '3.5%'
    div.style.left = '5%'
    div.style.cursor = 'pointer'
    div.appendChild(text);
    document.getElementById('fileselectarea').appendChild(div)
  }
}

function closePage2() {
  document.getElementById("warningmessage").style.display = 'none'
}


function loadPage() {
  document.getElementById("visiblebase").style.display = 'none'
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

  if (length == 0 && buttonclicks == 1) {
    let div = document.createElement('div');
    div.id = 'content';
    document.getElementById('fileselectarea').appendChild(div)
  } else if (buttonclicks == 1) {
    let divid = document.getElementById('content')
    divid.remove()
    let div = document.createElement('div');
    let text = document.createTextNode(`📄${title}`);
    div.id = 'content';
    div.style.color = "white";
    div.style.fontFamily = 'Noto Sans JP'
    div.style.position = 'absolute'
    div.style.top = '3.5%'
    div.style.left = '5%'
    div.style.cursor = 'pointer'
    div.appendChild(text);
    document.getElementById('fileselectarea').appendChild(div)
  } else if (buttonclicks > 1 && length == 0) {
    let divid = document.getElementById('content')
    divid.remove()
    let div = document.createElement('div');
    div.id = 'content';
    document.getElementById('fileselectarea').appendChild(div)
  } else if (buttonclicks > 1) {
    let divid = document.getElementById('content')
    divid.remove()
    let div = document.createElement('div');
    let text = document.createTextNode(`📄${title}`);
    div.id = 'content';
    div.style.fontFamily = 'Noto Sans JP'
    div.style.color = "white";
    div.style.position = 'absolute'
    div.style.top = '3.5%'
    div.style.left = '5%'
    div.style.cursor = 'pointer'
    div.appendChild(text);
    document.getElementById('fileselectarea').appendChild(div)
  }
}



function rememberSave() {
  let length = document.getElementById('maintextbox').value.length;
  if (btnClicked == true) {
    history.go(-1);
  } else if (hasChanged == false) {
    history.go(-1);
  } else if (btnClicked == false) {
    document.getElementById("warningmessage").style.display = 'block'
  }
}

function continueExit() {
  history.go(-1);
}