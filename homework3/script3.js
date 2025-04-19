/*
Program name: script3.js
Author: Eden A.
Date created: 2025-04-19
Date last edited: 2025-04-19
Version: 1.0
Description: Full JavaScript validation and dynamic error handling for Homework 3 in MIS3371.
*/

function displayDate() {
  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById("date-display").innerText = today.toLocaleDateString("en-US", options);
}

function updatePainLevel(val) {
  document.getElementById("painDisplay").innerText = `Pain Level: ${val}/10`;
}

function showError(id, message) {
  document.getElementById(id).innerText = message;
}

function clearError(id) {
  document.getElementById(id).innerText = "";
}

function validateTextField(id, pattern, errorId, message) {
  const field = document.getElementById(id);
  if (field.value.trim() === "") return showError(errorId, "This field is required");
  if (!pattern.test(field.value.trim())) return showError(errorId, message);
  clearError(errorId);
}

function validateOptionalField(id, pattern, errorId, message) {
  const field = document.getElementById(id);
  if (field.value.trim() !== "" && !pattern.test(field.value.trim())) {
    return showError(errorId, message);
  }
  clearError(errorId);
}

function validateDOB() {
  const dob = document.getElementById("dob").value;
  const errorId = "dobError";
  if (!dob) return showError(errorId, "Date of birth is required");
  const date = new Date(dob);
  const today = new Date();
  const earliest = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate());
  if (date > today) return showError(errorId, "Date cannot be in the future");
  if (date < earliest) return showError(errorId, "Date cannot be more than 120 years ago");
  clearError(errorId);
}

function validateSSN() {
  const field = document.getElementById("idNumber");
  const value = field.value.replace(/[^0-9]/g, "");
  if (value.length !== 9) return showError("idError", "ID must be exactly 9 digits");
  field.value = value.replace(/(\d{3})(\d{2})(\d{4})/, "$1-$2-$3");
  clearError("idError");
}

function validateEmail() {
  const email = document.getElementById("email").value.trim().toLowerCase();
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!pattern.test(email)) return showError("emailError", "Invalid email format");
  clearError("emailError");
}

function validatePhone() {
  const phone = document.getElementById("phone").value.trim();
  const pattern = /^\d{3}-\d{3}-\d{4}$/;
  if (!pattern.test(phone)) return showError("phoneError", "Phone must be in format 000-000-0000");
  clearError("phoneError");
}

function validateState() {
  const state = document.getElementById("state").value;
  if (!state) return showError("stateError", "Please select a state");
  clearError("stateError");
}

function validateZip() {
  const zip = document.getElementById("zip").value.trim();
  const pattern = /^\d{5}$/;
  if (!pattern.test(zip)) return showError("zipError", "Zip code must be 5 digits");
  clearError("zipError");
}

function validateUserId() {
  const userId = document.getElementById("userid").value.trim();
  const pattern = /^[a-zA-Z][a-zA-Z0-9_-]{4,19}$/;
  if (!pattern.test(userId)) return showError("useridError", "5-20 characters, no spaces, start with a letter");
  clearError("useridError");
}

function validatePasswords() {
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const userId = document.getElementById("userid").value;

  const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  if (!pattern.test(password)) {
    return showError("passwordError", "Password must be 8+ chars with uppercase, lowercase, and a number");
  }
  if (password === userId) return showError("passwordError", "Password cannot equal User ID");
  clearError("passwordError");

  if (password !== confirmPassword) return showError("confirmPasswordError", "Passwords do not match");
  clearError("confirmPasswordError");
}

function validateAll() {
  validateTextField("firstName", /^[a-zA-Z'\-]{1,30}$/, "firstNameError", "Only letters, apostrophes, or dashes allowed");
  validateOptionalField("middleInitial", /^[a-zA-Z]{1}$/, "middleInitialError", "Only 1 letter allowed");
  validateTextField("lastName", /^[a-zA-Z'\-]{1,30}$/, "lastNameError", "Only letters, apostrophes, or dashes allowed");
  validateDOB();
  validateSSN();
  validateEmail();
  validatePhone();
  validateTextField("address1", /^.{2,30}$/, "address1Error", "2–30 characters required");
  validateOptionalField("address2", /^.{2,30}$/, "address2Error", "2–30 characters if entered");
  validateTextField("city", /^.{2,30}$/, "cityError", "2–30 characters required");
  validateState();
  validateZip();
  validateUserId();
  validatePasswords();

  const errors = document.querySelectorAll(".error");
  let hasError = false;
  errors.forEach(error => {
    if (error.innerText !== "") hasError = true;
  });

  document.getElementById("submitBtn").style.display = hasError ? "none" : "inline-block";
}

// Assign event listeners on load
window.onload = () => {
  displayDate();
  [
    "firstName", "middleInitial", "lastName", "dob", "idNumber", "email", "phone",
    "address1", "address2", "city", "state", "zip", "userid", "password", "confirmPassword"
  ].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("blur", validateAll);
      el.addEventListener("input", validateAll);
    }
  });
};

/* End of script3.js */
