document.getElementById('closebutton').onclick = function() {
  closePage()
};
document.getElementById('back-button').onclick = function() {
  rememberSave()
};
document.getElementById('button-text').onclick = function() {
createFile()
listenImput()
};
document.getElementById('closebutton2').onclick = function() {
  closePage2()
};
document.getElementById('yes').onclick = function() {
  continueExit()
};

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
//break cuz too much code







//
let hasChanged = false
function listenImput() {
let changed = document.getElementById('maintextbox')
let changed2 = document.getElementById('title')
changed.addEventListener("input", () => {
  hasChanged = true
})
changed2.addEventListener("input", () => {
  hasChanged = true
})
}


function createFile() {
document.getElementById("visiblebase").style.display = 'none'
document.getElementById("save-button").style.display = 'block'
let div = document.createElement('div');
let textArea = document.createElement('textarea')
let titleArea = document.createElement('textarea')
div.id = 'note'
textArea.id = 'maintextbox'
titleArea.id = 'title'
titleArea.placeholder = 'Name your title...'
textArea.placeholder = 'Start writing your note here...'
titleArea.style.overflow = 'hidden'
titleArea.style.border = 'none'
titleArea.style.borderRadius = '15px'
titleArea.style.position = 'absolute'
titleArea.style.height = '5%'
titleArea.style.width = '92%'
titleArea.style.top = '-5%'
titleArea.style.textalign = 'left'
titleArea.style.marginTop = '7%'
titleArea.style.marginLeft = '2%'
titleArea.style.marginRight = '2%'
titleArea.style.backgroundColor = '#1C1E20'
titleArea.style.color = 'white'
titleArea.style.fontFamily = 'Noto Sans JP Bold'
titleArea.style.fontSize = '1rem'
titleArea.style.resize = 'none'
titleArea.style.outline = ' black'
titleArea.style.outlineWidth = '1px'
textArea.placeholder = 'Start writing your note here...'
textArea.style.border = 'none'
textArea.style.borderRadius = '15px'
textArea.style.position = 'absolute'
textArea.style.height = '71%'
textArea.style.width = '95%'
textArea.style.top = '4%'
textArea.style.textalign = 'left'
textArea.style.marginTop = '7%'
textArea.style.marginLeft = '2%'
textArea.style.marginRight = '2%'
textArea.style.backgroundColor = '#1C1E20'
textArea.style.color = 'white'
textArea.style.fontFamily = 'Noto Sans JP Light'
textArea.style.fontSize = '1rem'
textArea.style.resize = 'none'
textArea.style.outline = ' black'
textArea.style.outlineWidth = '1px'
div.style.position = 'fixed'
div.style.height = '83%'
div.style.width = '95%'
div.style.bottom = '1%'
div.style.margin = '20px'
div.style.backgroundColor = '#1C1E20'
div.style.borderRadius = '15px'
div.style.filter = 'drop-shadow(0px 2px 1px black)'
div.appendChild(textArea)
div.appendChild(titleArea)
document.getElementById('rightframe').appendChild(div)
}

function findfile() {
  let title = localStorage.getItem('title')
  let trim = title.trim();
  let length = trim.length
  if (length == 0) {
    let div = document.createElement('div');
    div.id = 'content';
    document.getElementById('file-select-area').appendChild(div)
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
    document.getElementById('fileflex').appendChild(div)
  }
}

function closePage2() {
  document.getElementById("warningmessage").style.display = 'none'
}


function loadPage() {
document.getElementById("visiblebase").style.display = 'none'
let div = document.createElement('div');
let textArea = document.createElement('textarea')
let titleArea = document.createElement('textarea')
div.id = 'note'
textArea.id = 'maintextbox'
titleArea.id = 'title'
titleArea.placeholder = 'Name your title...'
textArea.placeholder = 'Start writing your note here...'
titleArea.style.overflow = 'hidden'
titleArea.style.border = 'none'
titleArea.style.borderRadius = '15px'
titleArea.style.position = 'absolute'
titleArea.style.height = '5%'
titleArea.style.width = '92%'
titleArea.style.top = '-5%'
titleArea.style.textalign = 'left'
titleArea.style.marginTop = '7%'
titleArea.style.marginLeft = '2%'
titleArea.style.marginRight = '2%'
titleArea.style.backgroundColor = '#1C1E20'
titleArea.style.color = 'white'
titleArea.style.fontFamily = 'Noto Sans JP Bold'
titleArea.style.fontSize = '1rem'
titleArea.style.resize = 'none'
titleArea.style.outline = ' black'
titleArea.style.outlineWidth = '1px'
textArea.placeholder = 'Start writing your note here...'
textArea.style.border = 'none'
textArea.style.borderRadius = '15px'
textArea.style.position = 'absolute'
textArea.style.height = '71%'
textArea.style.width = '95%'
textArea.style.top = '4%'
textArea.style.textalign = 'left'
textArea.style.marginTop = '7%'
textArea.style.marginLeft = '2%'
textArea.style.marginRight = '2%'
textArea.style.backgroundColor = '#1C1E20'
textArea.style.color = 'white'
textArea.style.fontFamily = 'Noto Sans JP Light'
textArea.style.fontSize = '1rem'
textArea.style.resize = 'none'
textArea.style.outline = ' black'
textArea.style.outlineWidth = '1px'
div.style.position = 'fixed'
div.style.height = '83%'
div.style.width = '95%'
div.style.bottom = '1%'
div.style.margin = '20px'
div.style.backgroundColor = '#1C1E20'
div.style.borderRadius = '15px'
div.style.filter = 'drop-shadow(0px 2px 1px black)'
div.appendChild(textArea)
div.appendChild(titleArea)
document.getElementById('rightframe').appendChild(div)
maintextbox.value = localStorage.getItem('notes')
title.value = localStorage.getItem('title')
}

function closePage() {
  document.getElementById("note").style.display = 'none'
  document.getElementById('visiblebase').style.display = 'block'
}

function saveText() {
  let maintextbox = document.getElementById("maintextbox").value;
  let title = document.getElementById("title").value;
  let trim = title.trim();
  let length = trim.length
  localStorage.setItem('notes', maintextbox)
  localStorage.setItem('title', title)
  console.log(title)

  if (length == 0 && buttonclicks == 1) {
    let div = document.createElement('div');
    div.id = 'content';
    document.getElementById('file-select-area').appendChild(div)
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
    document.getElementById('file-select-area').appendChild(div)
  } else if (buttonclicks > 1 && length == 0) {
    let divid = document.getElementById('content')
    divid.remove()
    let div = document.createElement('div');
    div.id = 'content';
    document.getElementById('file-select-area').appendChild(div)
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
    document.getElementById('file-select-area').appendChild(div)
  }
}



function rememberSave() {
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