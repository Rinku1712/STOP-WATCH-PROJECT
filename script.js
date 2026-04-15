let [ms, sec, min, hr] = [0, 0, 0, 0];
let timer = null;
let isRunning = false;

const startBtn = document.getElementById('startBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const progressBar = document.getElementById('progress');
const lapsList = document.getElementById('lapsList');

const hrDisplay = document.getElementById('hr');
const minDisplay = document.getElementById('min');
const secDisplay = document.getElementById('sec');
const msDisplay = document.getElementById('ms');

function updateTimer() {
    ms++;
    if (ms >= 100) {
        ms = 0;
        sec++;
        if (sec >= 60) {
            sec = 0;
            min++;
            if (min >= 60) {
                min = 0;
                hr++;
            }
        }
    }

    // Update Text
    hrDisplay.innerText = hr.toString().padStart(2, '0');
    minDisplay.innerText = min.toString().padStart(2, '0');
    secDisplay.innerText = sec.toString().padStart(2, '0');
    msDisplay.innerText = ms.toString().padStart(2, '0');

    // Update Progress Ring (Circumference is ~283)
    const offset = 283 - (sec / 60) * 283;
    progressBar.style.strokeDashoffset = offset;
}

startBtn.addEventListener('click', () => {
    if (!isRunning) {
        timer = setInterval(updateTimer, 10);
        isRunning = true;
        document.body.classList.add('running');
        startBtn.innerText = "Pause";
        startBtn.style.background = "#94a3b8"; // Muted when running
    } else {
        clearInterval(timer);
        isRunning = false;
        document.body.classList.remove('running');
        startBtn.innerText = "Resume";
        startBtn.style.background = "#2dd4bf"; 
    }
});

lapBtn.addEventListener('click', () => {
    if (isRunning) {
        const lapTime = `${hrDisplay.innerText}:${minDisplay.innerText}:${secDisplay.innerText}.${msDisplay.innerText}`;
        const li = document.createElement('li');
        li.innerHTML = `
            <span style="color: #94a3b8">#${lapsList.children.length + 1}</span>
            <span>${lapTime}</span>
        `;
        lapsList.prepend(li);
    }
});

resetBtn.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    document.body.classList.remove('running');
    [ms, sec, min, hr] = [0, 0, 0, 0];
    
    hrDisplay.innerText = "00";
    minDisplay.innerText = "00";
    secDisplay.innerText = "00";
    msDisplay.innerText = "00";
    
    progressBar.style.strokeDashoffset = 283;
    startBtn.innerText = "Start";
    startBtn.style.background = "#2dd4bf";
    lapsList.innerHTML = "";
});
