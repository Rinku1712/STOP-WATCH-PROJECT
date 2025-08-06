
let display = document.getElementById("display");
let startBtn = document.getElementById("start");
let resetBtn = document.getElementById("reset");

let hours = 0;
let minutes = 0;
let seconds = 0; 
let timer = null; 
let running = false;
function updateDisplay() {
  let h, m, s;

  if (hours < 10) {
    h = "0" + hours;
  } else {
    h = hours;
  }
  if (minutes < 10) {
    m = "0" + minutes;
  } else {
    m = minutes;
  }
  if (seconds < 10) {
    s = "0" + seconds;
  } else {
    s = seconds;
  }
  display.innerText = h + ":" + m + ":" + s;
}
function runStopwatch() {
  seconds++;
  if (seconds == 60) {
    seconds = 0;
    minutes++;
  }

  if (minutes ==60) {
    minutes = 0;  
    hours++;
  }

  updateDisplay();
}
// Start/Stop button
startBtn.onclick = function () {
  if (running === false) {
    timer = setInterval(runStopwatch, 1000);
    running = true;
    startBtn.innerText = "Stop";
  } else {
    clearInterval(timer);
    running = false;
    startBtn.innerText = "Start";
  }
};
// Reset button
resetBtn.onclick = function () {
  clearInterval(timer);
  hours = 0;
  minutes = 0;
  seconds = 0;
  running = false;
  updateDisplay();
  startBtn.innerText = "Start";
};
