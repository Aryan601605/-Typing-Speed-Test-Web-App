// 🔐 Auth Elements
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const logoutBtn = document.getElementById("logoutBtn");

// Logged-in user
const user = localStorage.getItem("loggedInUser");

// 👁 Show / Hide buttons based on login state
if (user) {
  // User logged in
  if (loginBtn) loginBtn.style.display = "none";
  if (signupBtn) signupBtn.style.display = "none";
  if (logoutBtn) logoutBtn.style.display = "inline-block";
} else {
  // User NOT logged in
  if (loginBtn) loginBtn.style.display = "inline-block";
  if (signupBtn) signupBtn.style.display = "inline-block";
  if (logoutBtn) logoutBtn.style.display = "none";
}
function logout() {
  localStorage.removeItem("loggedInUser");
  alert("Logged out successfully!");
  window.location.href = "login.html";
}


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

// 🔐 Logged-in user
const user = localStorage.getItem("loggedInUser");

// 📝 Render Quote
function renderQuote() {
  quoteEl.innerHTML = quoteText
    .split("")
    .map(ch => `<span>${ch}</span>`)
    .join("");
}
renderQuote();

// ▶ Start Test
startBtn.onclick = () => {
  if (isRunning) return;

  isRunning = true;
  input.disabled = false;
  input.focus();

  timer = setInterval(() => {
    time--;
    timeEl.innerText = time;

    if (time === 0) finishTest();
  }, 1000);
};

// ⏸ Pause Test
stopBtn.onclick = () => {
  clearInterval(timer);
  isRunning = false;
  input.disabled = true;
};

// ⛔ Finish Test
finishBtn.onclick = finishTest;

function finishTest() {
  clearInterval(timer);
  isRunning = false;
  input.disabled = true;

  saveBestWPM();
  alert("Test Finished! Keep practicing 💪");
}

// ✍ Typing Logic
input.addEventListener("input", () => {
  const typed = input.value.split("");
  const chars = quoteEl.querySelectorAll("span");

  let correct = 0;

  chars.forEach((char, i) => {
    if (!typed[i]) {
      char.className = "";
    } else if (typed[i] === char.innerText) {
      char.className = "correct";
      correct++;
    } else {
      char.className = "wrong";
    }
  });

  const minutes = (60 - time) / 60;
  const words = typed.join("").trim().split(/\s+/).length;

  wpmEl.innerText = minutes > 0 ? Math.round(words / minutes) : 0;
  accuracyEl.innerText =
    typed.length > 0 ? Math.round((correct / typed.length) * 100) : 0;
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

// 💾 Save Best WPM (user-specific)
function saveBestWPM() {
  if (!user) return;

  const key = user + "_bestWPM";
  const best = localStorage.getItem(key) || 0;
  const current = Number(wpmEl.innerText);

  if (current > best) {
    localStorage.setItem(key, current);
  }
}
