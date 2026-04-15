let hr = 0, min = 0, sec = 0, ms = 0;
let timer = null;
let lapCount = 1;

let h = document.getElementById("hours");
let m = document.getElementById("minutes");
let s = document.getElementById("seconds");
let milli = document.getElementById("ms");
let laps = document.getElementById("laps");
let progress = document.getElementById("progress");

/* Load saved laps */
let savedLaps = JSON.parse(localStorage.getItem("laps")) || [];
savedLaps.forEach(addLapToUI);
lapCount = savedLaps.length + 1;

function updateDisplay() {
  h.innerText = hr.toString().padStart(2, "0");
  m.innerText = min.toString().padStart(2, "0");
  s.innerText = sec.toString().padStart(2, "0");
  milli.innerText = ms.toString().padStart(2, "0");

  // progress ring (based on seconds)
  let offset = 565 - (sec / 60) * 565;
  progress.style.strokeDashoffset = offset;
}

function stopwatch() {
  ms++;
  if (ms === 100) { ms = 0; sec++; }
  if (sec === 60) { sec = 0; min++; }
  if (min === 60) { min = 0; hr++; }

  updateDisplay();
}

/* Add Lap */
function addLapToUI(time) {
  let li = document.createElement("li");
  li.innerText = `Lap ${lapCount}: ${time}`;
  laps.appendChild(li);
}

/* Start */
document.getElementById("start").onclick = () => {
  if (timer === null) {
    timer = setInterval(stopwatch, 10);
  }
};

/* Lap */
document.getElementById("lap").onclick = () => {
  if (timer !== null) {
    let time = `${h.innerText}:${m.innerText}:${s.innerText}.${milli.innerText}`;

    addLapToUI(time);

    savedLaps.push(time);
    localStorage.setItem("laps", JSON.stringify(savedLaps));

    lapCount++;
  }
};

/* Reset */
document.getElementById("reset").onclick = () => {
  clearInterval(timer);
  timer = null;

  hr = min = sec = ms = 0;
  lapCount = 1;

  updateDisplay();

  laps.innerHTML = "";
  localStorage.removeItem("laps");
};
