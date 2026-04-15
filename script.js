let display = document.getElementById("display");
let startBtn = document.getElementById("start");
let resetBtn = document.getElementById("reset");

let hours = 0;
let minutes = 0;
let seconds = 0;
let timer = null;
let running = false;

function updateDisplay() {
  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;

  display.innerText = h + ":" + m + ":" + s;
}

function runStopwatch() {
  seconds++;

  if (seconds === 60) {
    seconds = 0;
    minutes++;
  }

  if (minutes === 60) {
    minutes = 0;
    hours++;
  }

  updateDisplay();
}

/* Start / Stop */
startBtn.onclick = function () {
  if (!running) {
    timer = setInterval(runStopwatch, 1000);
    running = true;
    startBtn.innerText = "Stop";
  } else {
    clearInterval(timer);
    running = false;
    startBtn.innerText = "Start";
  }
};

/* Reset */
resetBtn.onclick = function () {
  clearInterval(timer);
  hours = 0;
  minutes = 0;
  seconds = 0;
  running = false;
  updateDisplay();
  startBtn.innerText = "Start";
};
