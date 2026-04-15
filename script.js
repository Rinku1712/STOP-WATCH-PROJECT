let [ms, sec, min, hr] = [0, 0, 0, 0];
let timer = null;
let isRunning = false;

const startBtn = document.getElementById('startBtn');
const progressBar = document.getElementById('progress');
const lapsList = document.getElementById('lapsList');
const container = document.querySelector('.glass-orb');

function updateDisplay() {
    ms++;
    if (ms >= 100) { ms = 0; sec++;
        if (sec >= 60) { sec = 0; min++;
            if (min >= 60) { min = 0; hr++; }
        }
    }
    
    document.getElementById('hr').innerText = hr.toString().padStart(2, '0');
    document.getElementById('min').innerText = min.toString().padStart(2, '0');
    document.getElementById('sec').innerText = sec.toString().padStart(2, '0');
    document.getElementById('ms').innerText = ms.toString().padStart(2, '0');

    // Smooth Ring Update (Circumference 301.5)
    const offset = 301.5 - (sec / 60) * 301.5;
    progressBar.style.strokeDashoffset = offset;
}

startBtn.addEventListener('click', () => {
    if (!isRunning) {
        timer = setInterval(updateDisplay, 10);
        isRunning = true;
        container.classList.add('running');
        startBtn.innerText = "PAUSE";
        startBtn.style.background = "#4facfe"; 
    } else {
        clearInterval(timer);
        isRunning = false;
        container.classList.remove('running');
        startBtn.innerText = "RESUME";
        startBtn.style.background = "#1a202c";
    }
});

document.getElementById('lapBtn').addEventListener('click', () => {
    if (isRunning) {
        const li = document.createElement('li');
        li.innerHTML = `<span style="opacity:0.4; font-weight:800">#${lapsList.children.length + 1}</span> 
                        <span style="font-family: 'JetBrains Mono'">${hr}:${min}:${sec}.${ms}</span>`;
        lapsList.prepend(li);
    }
});

document.getElementById('resetBtn').addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    [ms, sec, min, hr] = [0, 0, 0, 0];
    document.querySelectorAll('.digits span, .milliseconds').forEach(s => s.innerText = "00");
    progressBar.style.strokeDashoffset = 301.5;
    startBtn.innerText = "START";
    startBtn.style.background = "#1a202c";
    container.classList.remove('running');
    lapsList.innerHTML = "";
});
