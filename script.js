const quoteText =
  "JavaScript is a powerful language used to make web pages interactive.";

const quoteEl = document.getElementById("quote");
const input = document.getElementById("input");
const timeEl = document.getElementById("time");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");

const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const finishBtn = document.getElementById("finish");
const resetBtn = document.getElementById("reset");

let time = 60;
let timer = null;
let isRunning = false;

// Render quote
function renderQuote() {
  quoteEl.innerHTML = quoteText
    .split("")
    .map(char => `<span>${char}</span>`)
    .join("");
}
renderQuote();

// ▶ Start / Resume
startBtn.onclick = () => {
  if (isRunning) return;

  isRunning = true;
  input.disabled = false;
  input.focus();

  timer = setInterval(() => {
    time--;
    timeEl.innerText = time;

    if (time === 0) {
      finishTest();
    }
  }, 1000);
};

// ⏸ Stop / Pause
stopBtn.onclick = () => {
  if (!isRunning) return;

  clearInterval(timer);
  isRunning = false;
  input.disabled = true;
};

// ⛔ Finish
finishBtn.onclick = () => {
  finishTest();
};

function finishTest() {
  clearInterval(timer);
  isRunning = false;
  input.disabled = true;
  saveBestWPM();
  alert("Test Finished! Stay consistent 💪");
}

// Typing logic
input.addEventListener("input", () => {
  const typed = input.value.split("");
  const chars = quoteEl.querySelectorAll("span");

  let correctChars = 0;

  chars.forEach((char, index) => {
    if (typed[index] == null) {
      char.className = "";
    } else if (typed[index] === char.innerText) {
      char.className = "correct";
      correctChars++;
    } else {
      char.className = "wrong";
    }
  });

  const minutes = (60 - time) / 60;
  const words = typed.join("").trim().split(/\s+/).length;

  wpmEl.innerText = minutes > 0 ? Math.round(words / minutes) : 0;
  accuracyEl.innerText =
    typed.length > 0 ? Math.round((correctChars / typed.length) * 100) : 0;
});

// 🔄 Reset
resetBtn.onclick = () => {
  clearInterval(timer);
  time = 60;
  isRunning = false;

  timeEl.innerText = 60;
  input.value = "";
  input.disabled = true;
  wpmEl.innerText = 0;
  accuracyEl.innerText = 0;

  renderQuote();
};

// 💾 Backend-like feature (localStorage)
function saveBestWPM() {
  const best = localStorage.getItem("bestWPM") || 0;
  const current = Number(wpmEl.innerText);

  if (current > best) {
    localStorage.setItem("bestWPM", current);
  }
}
