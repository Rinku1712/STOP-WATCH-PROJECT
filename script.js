let hr = 0, min = 0, sec = 0, ms = 0;
let timer = null;

let h = document.getElementById("hours");
let m = document.getElementById("minutes");
let s = document.getElementById("seconds");
let milli = document.getElementById("ms");

function updateDisplay() {
  h.innerText = hr < 10 ? "0" + hr : hr;
  m.innerText = min < 10 ? "0" + min : min;
  s.innerText = sec < 10 ? "0" + sec : sec;
  milli.innerText = ms < 10 ? "0" + ms : ms;
}

function stopwatch() {
  ms++;

  if (ms == 100) {
    ms = 0;
    sec++;
  }

  if (sec == 60) {
    sec = 0;
    min++;
  }

  if (min == 60) {
    min = 0;
    hr++;
  }

  updateDisplay();
}

/* Start */
document.getElementById("start").onclick = function () {
  if (timer == null) {
    timer = setInterval(stopwatch, 10);
  }
};

/* Pause */
document.getElementById("pause").onclick = function () {
  clearInterval(timer);
  timer = null;
};

/* Reset */
document.getElementById("reset").onclick = function () {
  clearInterval(timer);
  timer = null;

  hr = min = sec = ms = 0;
  updateDisplay();
};
