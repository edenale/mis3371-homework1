// script.js

// Cookie handling
function setCookie(name, value, hours) {
  const date = new Date();
  date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}

function getCookie(name) {
  const cookieArr = document.cookie.split(";");
  for (let cookie of cookieArr) {
    cookie = cookie.trim();
    if (cookie.startsWith(name + "=")) {
      return cookie.substring(name.length + 1);
    }
  }
  return "";
}

function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function initializePage() {
  const storedName = getCookie("firstName");
  const welcome = document.getElementById("welcomeMessage");
  const nameBox = document.getElementById("first_name");
  const newUserLabel = document.getElementById("newUserLabel");
  const storedNameSpan = document.getElementById("storedName");

  if (storedName) {
    welcome.innerText = `Welcome back, ${storedName}`;
    nameBox.value = storedName;
    storedNameSpan.innerText = storedName;
    newUserLabel.style.display = "inline";
    showModal();
  } else {
    welcome.innerText = "Welcome new user";
    newUserLabel.style.display = "none";
  }
}

function resetUser() {
  deleteCookie("firstName");
  localStorage.clear();
  document.getElementById("patientForm").reset();
  document.getElementById("welcomeMessage").innerText = "Welcome new user";
  document.getElementById("newUserLabel").style.display = "none";
  document.getElementById("modal").style.display = "none";
}

function handleSubmit(event) {
  event.preventDefault();
  const name = document.getElementById("first_name").value.trim();
  const remember = document.getElementById("rememberMe").checked;

  if (remember && name) {
    setCookie("firstName", name, 48);
    localStorage.setItem("first_name", name);
  } else {
    deleteCookie("firstName");
    localStorage.clear();
  }

  alert("Form submitted!\n(Thank you page would load here.)");
  return false;
}

function showModal() {
  document.getElementById("modal").style.display = "block";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

function restoreData() {
  const form = document.getElementById("patientForm");
  for (let i = 0; i < form.elements.length; i++) {
    const field = form.elements[i];
    if (localStorage.getItem(field.name)) {
      field.value = localStorage.getItem(field.name);
    }
  }
  closeModal();
}

function storeAllFields() {
  const form = document.getElementById("patientForm");
  for (let i = 0; i < form.elements.length; i++) {
    const field = form.elements[i];
    if (field.name && field.value) {
      localStorage.setItem(field.name, field.value);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("patientForm");
  if (form) {
    form.addEventListener("input", storeAllFields);
  }
});
