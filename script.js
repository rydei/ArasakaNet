
//Time Updater
function TimeUpdater(){
var timeRN = new Date().toLocaleString();
var timeHolder = document.querySelector("#time");
timeHolder.innerHTML = timeRN;}

setInterval(TimeUpdater,1000);
/*dragElement(document.getElementById("snote"))*/

function dragElement(element) {

    var initialX = 0;
    var initialy = 0;
    var currentX = 0;
    var currentY = 0;

    if (document.getElementById(element.id + "header")) {
        document.getElementById(element.id + "header").onmousedown = startDragging;
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

function closeWindow(element, iconId) {
  element.style.display = "none";
  if (iconId) {
    var icon = document.getElementById(iconId);
    if (icon) {
      icon.classList.remove("selected");
    }
  }
}

function openWindow(element) {
  element.style.display = "none";
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
  closeWindow(nasaScreen,"nasaapp");
});

nasaOpen.addEventListener("click", function() {
  openWindow(nasaScreen);
});

/*3.SNote

var noteScreen = document.querySelector("#note");
var noteClose = document.querySelector("#noteclose");
var noteOpen = document.querySelector("#noteopen");

noteClose.addEventListener("click", function() {
  closeWindow(noteScreen);
});
noteOpen.addEventListener("click", function() {
  openWindow(noteScreen);
});*/

//4. timer

var timerScreen = document.querySelector("#timer");
var timerClose = document.querySelector("#timerclose");
var timerOpen = document.querySelector("#timeropen");

timerClose.addEventListener("click", function() {
  closeWindow(timerScreen,"timerapp");
});

timerOpen.addEventListener("click", function() {
  openWindow(timerScreen);
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
initializeWindow("timer")
/*initializeWindow("snote")*/

let defaultTime = 300;
let timeLeft = defaultTime; 
let timerInterval = null;

const display = document.getElementById('display');
const startB = document.getElementById('startB');
const pauseB = document.getElementById('pauseB');
const resetB = document.getElementById('resetB');
const minutes = document.getElementById('minutes');
const setTimeB = document.getElementById('setTimeB');

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  display.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

function setCustomTime() {
  const userMinutes = parseInt(minutes.value);
  if (isNaN(userMinutes) || userMinutes <= 0) {
    alert("Please enter a valid number of minutes");
    return;
    }

  pauseTimer(); 
  defaultTime = userMinutes * 60; 
  timeLeft = defaultTime;
  updateDisplay();
}

function startTimer() {
if (timerInterval !== null) return; 
timerInterval = setInterval(() => {
  if (timeLeft > 0) {
    timeLeft--;
    updateDisplay();
  } else {
    clearInterval(timerInterval);
    timerInterval = null;
    alert("Time is up!");
  }}, 1000); 
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  pauseTimer();
  timeLeft = defaultTime; 
  updateDisplay();
}

setTimeB.addEventListener('click', setCustomTime);
startB.addEventListener('click', startTimer);
pauseB.addEventListener('click', pauseTimer);
resetB.addEventListener('click', resetTimer);
updateDisplay();

var sidebar = document.querySelector("#sidebar");
var logoB = document.querySelector("#logo");

logoB.onclick = function toggleSidebar(){
  if (sidebar.style.display === "flex") {
    sidebar.style.display = "none";
    logoB.classList.remove("selected");
  } else{
    sidebar.style.display = "flex";
    logoB.classList.add("selected");
  }
};
function toggleApp(IconId,windowId) {

  var icon = document.getElementById(IconId);
  var screen = document.getElementById(windowId);

  if (screen.style.display === "flex") {
    screen.style.display = "none";
    icon.classList.remove("selected");
  } else{
    screen.style.display = "flex";
    icon.classList.add("selected");
  };
};

document.getElementById("nasaapp").onclick = function() { toggleApp("nasaapp","nasa")};
document.getElementById("timerapp").onclick = function(){ toggleApp("timerapp","timer")};