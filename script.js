let hr = 0, min = 0, sec = 0, ms = 0;
let timer = null;
let lapCount = 1;

let h = document.getElementById("hours");
let m = document.getElementById("minutes");
let s = document.getElementById("seconds");
let milli = document.getElementById("ms");
let laps = document.getElementById("laps");

function updateDisplay() {
  h.innerText = hr.toString().padStart(2, "0");
  m.innerText = min.toString().padStart(2, "0");
  s.innerText = sec.toString().padStart(2, "0");
  milli.innerText = ms.toString().padStart(2, "0");
}

function stopwatch() {
  ms++;

  if (ms === 100) {
    ms = 0;
    sec++;
  }

  if (sec === 60) {
    sec = 0;
    min++;
  }

  if (min === 60) {
    min = 0;
    hr++;
  }

  updateDisplay();
}

/* Start */
document.getElementById("start").onclick = function () {
  if (timer === null) {
    timer = setInterval(stopwatch, 10);
  }
};

/* Pause + Lap */
document.getElementById("pause").onclick = function () {
  if (timer !== null) {
    clearInterval(timer);
    timer = null;

    let li = document.createElement("li");
    li.innerHTML = `<span>Lap ${lapCount}</span>
                    <span>${h.innerText}:${m.innerText}:${s.innerText}.${milli.innerText}</span>`;
    laps.appendChild(li);

    lapCount++;
  }
};

/* Reset */
document.getElementById("reset").onclick = function () {
  clearInterval(timer);
  timer = null;

  hr = min = sec = ms = 0;
  lapCount = 1;

  updateDisplay();
  laps.innerHTML = "";
};
