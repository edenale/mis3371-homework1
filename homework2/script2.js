function displayDate() {
  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById("date-display").innerText = today.toLocaleDateString("en-US", options);
}

function updatePainLevel(val) {
  document.getElementById("painDisplay").innerText = `Pain Level: ${val}/10`;
}

function validateForm() {
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm_password").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return false;
  }

  return true;
}

function reviewData() {
  const form = document.forms["patientForm"];
  let output = "<h2>PLEASE REVIEW THIS INFORMATION</h2><ul>";
  output += "<li>First Name: " + form["first_name"].value + "</li>";
  output += "<li>Phone: " + form["phone"].value + "</li>";
  output += "<li>Pain Level: " + document.getElementById("painRange").value + "/10</li>";
  output += "<li>Symptoms: " + form["symptoms"].value + "</li>";
  output += "<li>Password: (hidden for security)</li>";
  output += "</ul>";
  document.getElementById("reviewSection").innerHTML = output;
}

