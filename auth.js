function signup() {
  const user = signupUser.value;
  const pass = signupPass.value;

  if (!user || !pass) {
    alert("Fill all fields");
    return;
  }

  localStorage.setItem("user", user);
  localStorage.setItem("pass", pass);

  alert("Signup successful!");
  window.location.href = "login.html";
}

function login() {
  const user = loginUser.value;
  const pass = loginPass.value;

  if (
    user === localStorage.getItem("user") &&
    pass === localStorage.getItem("pass")
  ) {
    localStorage.setItem("loggedInUser", user);
    window.location.href = "index.html";
  } else {
    alert("Invalid credentials");
  }
}

function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}

// 🔒 Protect pages
if (
  location.pathname.includes("index") ||
  location.pathname.includes("profile")
) {
  if (!localStorage.getItem("loggedInUser")) {
    window.location.href = "login.html";
  }
}
