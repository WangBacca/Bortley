var menuButtons = document.getElementsByClassName("MenuButton");
var mainStyle = document.createElement("style");
var mainPageIFrame = document.getElementsByClassName("MainPage_iframe")[0];
var splitURL = window.location.href.split("/");
var mainPath = "/Pages/"

if (splitURL[2] == "wangbacca.github.io") {
    mainPath = "/Bortley/Pages/";
}

//Pull the CSS rules for the main page so I can push them to new pages
let cssFileRequest = new XMLHttpRequest();
cssFileRequest.open("GET", "main.css", true);
cssFileRequest.send();

cssFileRequest.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) { 
        mainStyle.textContent = this.response;
    }
}

for (let i = 0; i < menuButtons.length; i++) {
    menuButtons[i].onclick = function () {
        var buttonText = this.innerText;
        var pageName = buttonText.toLowerCase();
        mainPageIFrame.src = `${mainPath}${pageName}.html`
    }
}

function styleAndResizeIFrame() {
    mainPageIFrame.contentDocument.head.appendChild(mainStyle);
    mainPageIFrame.style.border = "none";
    mainPageIFrame.style.height = (window.document.body.scrollHeight - 400) + "px";
    mainPageIFrame.style.width = (window.document.body.scrollWidth - 240) + "px";
}

mainPageIFrame.onload = function () {
    styleAndResizeIFrame();
}

document.body.onresize = function () {
    styleAndResizeIFrame();
}



