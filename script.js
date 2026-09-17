
//Time Updater
function TimeUpdater(){
var timeRN = new Date().toLocaleString();
var timeHolder = document.querySelector("#time");
timeHolder.innerHTML = timeRN;}

setInterval(TimeUpdater,1000);

//Draggable Windows
dragElement(document.getElementById("outlinemain"))
dragElement(document.getElementById("nasa"))

function dragElement(element) {

    var initialX = 0;
    var initialy = 0;
    var currentX = 0;
    var currentY = 0;

    if (document.getElementById(element.Id + "header")) {
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

//Resize or Close
//1. info
var outlineScreen = document.querySelector("#outlinemain")
var outlineClose = document.querySelector("#outlineclose")
var outlineOpen = document.querySelector("#outlineopen")

function closeWindow(element) {
  element.style.display = "none"
}

function openWindow(element) {
  element.style.display = "flex";
  biggestIndex++; 
  element.style.zIndex = biggestIndex;
  topbar.style.zIndex = biggestIndex + 1;
}

outlineClose.addEventListener("click", function() {
  closeWindow(outlineScreen);
});

outlineOpen.addEventListener("click", function() {
  openWindow(outlineScreen);
});
//2. nasa
var nasaScreen = document.querySelector("#nasa");
var nasaClose = document.querySelector("#nasaclose");
var nasaOpen = document.querySelector("#nasaopen");

nasaClose.addEventListener("click", function() {
  closeWindow(nasaScreen);
});

nasaOpen.addEventListener("click", function() {
  openWindow(nasaScreen);
});


//Icons

var selectedIcon = undefined;

function selectIcon(element) {
  element.classList.add("selected");
  selectedIcon = element
  } 

function deselectIcon(element) {
  element.classList.remove("selected");
  selectedIcon = undefined
  }

function handleIconTap(element) {
  if (element.classList.contains("selected")) {
    deselectIcon(element)
    openWindow(window)
  } else {
    selectIcon(element)
  }
}

//Making it Tappable
var biggestIndex = 1;
var topbar = document.querySelector("#topbar");

function addWindowTapHandling(element) {
  element.addEventListener("mousedown", () =>
    handleWindowTap(element)
  )
}

function handleWindowTap(element) {
  biggestIndex++;  
  element.style.zIndex = biggestIndex;
  topbar.style.zIndex = biggestIndex + 1;
  deselectIcon(selectedIcon)
}

function initializeWindow(elementName) {
  var screen = document.querySelector("#" + elementName)
  addWindowTapHandling(screen)
  dragElement(screen)
}

initializeWindow("nasa")
initializeWindow("outlinemain")