let hourHand = document.getElementById("hour");
let minuteHand = document.getElementById("minute");
let secondHand = document.getElementById("second");

function updateClock() {
  let now = new Date();

  let seconds = now.getSeconds();
  let minutes = now.getMinutes();
  let hours = now.getHours();

  // Calculate rotation
  let secDeg = seconds * 6;
  let minDeg = minutes * 6 + seconds * 0.1;
  let hrDeg = hours * 30 + minutes * 0.5;

  secondHand.style.transform = `translateX(-50%) rotate(${secDeg}deg)`;
  minuteHand.style.transform = `translateX(-50%) rotate(${minDeg}deg)`;
  hourHand.style.transform = `translateX(-50%) rotate(${hrDeg}deg)`;
}

// Run every second
setInterval(updateClock, 1000);

// Initial call
updateClock();
