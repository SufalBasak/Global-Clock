function switchTab(id) {
  document
    .querySelectorAll(".tab")
    .forEach((t) => t.classList.remove("active"));
  document
    .querySelectorAll(".feature")
    .forEach((f) => f.classList.remove("active"));
  document.querySelector(`.tab[onclick*='${id}']`).classList.add("active");
  document.getElementById(id).classList.add("active");
}

function updateClock() {
  const now = new Date();
  document.getElementById("liveClock").textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

let stopwatchInterval,
  stopwatchTime = 0;
function updateStopwatch() {
  stopwatchTime++;
  const hrs = Math.floor(stopwatchTime / 3600);
  const mins = Math.floor((stopwatchTime % 3600) / 60);
  const secs = stopwatchTime % 60;
  document.getElementById("stopwatchDisplay").textContent = `${hrs
    .toString()
    .padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
}
function startStopwatch() {
  if (!stopwatchInterval)
    stopwatchInterval = setInterval(updateStopwatch, 1000);
}
function stopStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
}
function resetStopwatch() {
  stopStopwatch();
  stopwatchTime = 0;
  updateStopwatch();
}

let timerInterval;
function startTimer() {
  let time = parseInt(document.getElementById("timerInput").value);
  if (isNaN(time) || time <= 0) return;
  function updateTimer() {
    if (time <= 0) {
      clearInterval(timerInterval);
      alert("Time is up!");
    } else {
      time--;
      const mins = Math.floor(time / 60);
      const secs = time % 60;
      document.getElementById("timerDisplay").textContent = `${mins
        .toString()
        .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
  }
  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);
}
function resetTimer() {
  clearInterval(timerInterval);
  document.getElementById("timerDisplay").textContent = "00:00";
}

let alarmTimeout;
function setAlarm() {
  const time = document.getElementById("alarmTime").value;
  const now = new Date();
  const alarm = new Date(now.toDateString() + " " + time);
  if (alarm < now) alarm.setDate(alarm.getDate() + 1);
  const timeToAlarm = alarm - now;
  document.getElementById(
    "alarmStatus"
  ).textContent = `Alarm set for ${alarm.toLocaleTimeString()}`;
  alarmTimeout = setTimeout(() => {
    alert("⏰ Alarm ringing!");
    document.getElementById("alarmStatus").textContent = "";
  }, timeToAlarm);
}
