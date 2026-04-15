let [ms, sec, min, hr] = [0, 0, 0, 0];
let timer = null;
let isRunning = false;

const displayHr = document.getElementById('hours');
const displayMin = document.getElementById('minutes');
const displaySec = document.getElementById('seconds');
const displayMs = document.getElementById('ms');
const progressBar = document.getElementById('progress-bar');
const lapsList = document.getElementById('lapsList');

// LocalStorage se puraane laps load karna
window.onload = () => {
    const savedLaps = JSON.parse(localStorage.getItem('myLaps')) || [];
    savedLaps.forEach(lap => renderLap(lap));
};

function updateTimer() {
    ms++;
    if (ms == 100) {
        ms = 0;
        sec++;
        if (sec == 60) {
            sec = 0;
            min++;
            if (min == 60) {
                min = 0;
                hr++;
            }
        }
    }

    // Progress Ring Update (691.15 is the circumference)
    let offset = 691.15 - (sec / 60) * 691.15;
    progressBar.style.strokeDashoffset = offset;

    displayHr.innerText = hr.toString().padStart(2, "0");
    displayMin.innerText = min.toString().padStart(2, "0");
    displaySec.innerText = sec.toString().padStart(2, "0");
    displayMs.innerText = ms.toString().padStart(2, "0");
}

document.getElementById('startBtn').addEventListener('click', () => {
    if (!isRunning) {
        timer = setInterval(updateTimer, 10);
        isRunning = true;
        document.getElementById('startBtn').innerText = "Pause";
        document.getElementById('startBtn').style.background = "#ff9800";
    } else {
        clearInterval(timer);
        isRunning = false;
        document.getElementById('startBtn').innerText = "Start";
        document.getElementById('startBtn').style.background = "#00adb5";
    }
});

document.getElementById('lapBtn').addEventListener('click', () => {
    if (isRunning) {
        const currentLap = `${displayHr.innerText}:${displayMin.innerText}:${displaySec.innerText}.${displayMs.innerText}`;
        
        // UI mein add karna
        renderLap(currentLap);
        
        // LocalStorage mein save karna
        const savedLaps = JSON.parse(localStorage.getItem('myLaps')) || [];
        savedLaps.push(currentLap);
        localStorage.setItem('myLaps', JSON.stringify(savedLaps));
    }
});

function renderLap(timeText) {
    const li = document.createElement('li');
    li.innerHTML = `<span>Lap ${lapsList.children.length + 1}</span> <span>${timeText}</span>`;
    lapsList.prepend(li); // Naya lap sabse upar dikhega
}

document.getElementById('resetBtn').addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    [ms, sec, min, hr] = [0, 0, 0, 0];
    
    displayHr.innerText = "00";
    displayMin.innerText = "00";
    displaySec.innerText = "00";
    displayMs.innerText = "00";
    progressBar.style.strokeDashoffset = 691.15;
    
    document.getElementById('startBtn').innerText = "Start";
    document.getElementById('startBtn').style.background = "#00adb5";
    
    // Clear Laps from UI and LocalStorage
    lapsList.innerHTML = "";
    localStorage.removeItem('myLaps');
});
