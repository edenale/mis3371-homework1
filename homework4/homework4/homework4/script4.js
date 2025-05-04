// script4.js
// Handles welcome messages, cookies, and form logic for Homework 4

function setCookie(name, value, hours) {
  const date = new Date();
  date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}

function getCookie(name) {
  const cookieArr = document.cookie.split(";");
  for (let i = 0; i < cookieArr.length; i++) {
    let cookie = cookieArr[i].trim();
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
  } else {
    welcome.innerText = "Welcome new user";
    newUserLabel.style.display = "none";
  }
}

function resetUser() {
  deleteCookie("firstName");
  document.getElementById("patientForm").reset();
  document.getElementById("welcomeMessage").innerText = "Welcome new user";
  document.getElementById("newUserLabel").style.display = "none";
}

function handleSubmit(event) {
  event.preventDefault();
  const name = document.getElementById("first_name").value.trim();
  const remember = document.getElementById("rememberMe").checked;

  if (remember && name) {
    setCookie("firstName", name, 48);
  } else {
    deleteCookie("firstName");
  }

  alert("Form submitted successfully!\n(If this were a real form, you'd now go to the thank you page.)");
  return false;
} // You could also use window.location.href = 'thankyou.html'; here if needed.
