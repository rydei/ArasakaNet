function TimeUpdater(){
var timeRN = new Date().toLocaleString();
var timeHolder = document.querySelecton("#time");
timeHolder.innerHTML = timeRN;}

setInterval(TimeUpdater,1000);