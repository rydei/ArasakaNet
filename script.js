
//Time Updater
function TimeUpdater(){
var timeRN = new Date().toLocaleString();
var timeHolder = document.querySelector("#time");
timeHolder.innerHTML = timeRN;}

setInterval(TimeUpdater,1000);

//Draggable Windows
dragElement(document.getElementById("outlinemain"))

function dragElement(element) {

    var initialX = 0;
    var initialy = 0;
    var currentX = 0;
    var currentY = 0;

    if (document.getElementById(element.id + "header")) {
        document.getElementById(element.Id + "header").onmousedown = startDragging;
    } else{
        element.onmousedown = startDragging;
    }
    
    function startDragging(e){
        e=e || window.event;
        e.preventDefault();
        initialX= e.clientX;
        initialY = e.clientY;
        document.onmouseup = stopDragging;
        document.onmousemove = dragElement;
    }
    
    function dragElement(e) {
    e = e || window.event;
    e.preventDefault();

    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
    }

    function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
    }
}

//Resizez or Close

var outlineScreen = document.querySelector("#outlinemain")
var outlineClose = document.querySelector("#outlineclose")
var outlineOpen = document.querySelector("#outlineopen")

function closeWindow(element) {
  element.style.display = "none"
}

function openWindow(element) {
  element.style.display = "flex"
}

outlineClose.addEventListener("click", function() {
  closeWindow(outlineScreen);
});

outlineOpen.addEventListener("click", function() {
  openWindow(outlineScreen);
});