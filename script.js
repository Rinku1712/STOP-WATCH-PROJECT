let hourHand = document.getElementById("hour");
let minuteHand = document.getElementById("minute");
let secondHand = document.getElementById("second");

let startBtn = document.getElementById("start");
let resetBtn = document.getElementById("reset");

let seconds = 0;
let minutes = 0;
let hours = 0;

let timer = null;
let running = false;

function updateWatch() {
  seconds++;

  if (seconds === 60) {
    seconds = 0;
    minutes++;
  }

  if (minutes === 60) {
    minutes = 0;
    hours++;
  }

  let secDeg = seconds * 6;
  let minDeg = minutes * 6;
  let hrDeg = hours * 30;

  secondHand.style.transform = `translateX(-50%) rotate(${secDeg}deg)`;
  minuteHand.style.transform = `translateX(-50%) rotate(${minDeg}deg)`;
  hourHand.style.transform = `translateX(-50%) rotate(${hrDeg}deg)`;
}

/* Start / Stop */
startBtn.onclick = function () {
  if (!running) {
    timer = setInterval(updateWatch, 1000);
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
  seconds = 0;
  minutes = 0;
  hours = 0;
  running = false;

  updateWatch();

  secondHand.style.transform = "translateX(-50%) rotate(0deg)";
  minuteHand.style.transform = "translateX(-50%) rotate(0deg)";
  hourHand.style.transform = "translateX(-50%) rotate(0deg)";

  startBtn.innerText = "Start";
};
