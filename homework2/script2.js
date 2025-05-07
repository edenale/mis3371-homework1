function displayDate() {
  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById("date-display").innerText = today.toLocaleDateString("en-US", options);

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const maxDate = `${year}-${month}-${day}`;
  const minYear = year - 120;
  const minDate = `${minYear}-${month}-${day}`;
  document.getElementById("dob").setAttribute("max", maxDate);
  document.getElementById("dob").setAttribute("min", minDate);
}

function updatePainLevel(val) {
  document.getElementById("painDisplay").innerText = `Pain Level: ${val}/10`;
}

function updateSalary(val) {
  document.getElementById("salaryDisplay").innerText = `$${parseInt(val).toLocaleString()}/year`;
}

function validateForm() {
  const userId = document.getElementById("user_id");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirm_password");

  userId.value = userId.value.toLowerCase();

  const passwordVal = password.value;
  const userIdVal = userId.value;

  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d\s\"']).{8,30}$/;

  if (!regex.test(passwordVal)) {
    alert("Password must be 8–30 characters, include uppercase, lowercase, number, and a special character. No quotes.");
    return false;
  }

  if (passwordVal !== confirmPassword.value) {
    alert("Passwords do not match.");
    return false;
  }

  if (
    passwordVal.toLowerCase().includes(userIdVal) ||
    passwordVal.toLowerCase().includes(document.getElementById("first_name").value.toLowerCase())
  ) {
    alert("Password must not include your User ID or name.");
    return false;
  }

  return true;
}

function reviewData() {
  const form = document.forms["patientForm"];
  const conditions = [...form["conditions"]]
    .filter(box => box.checked)
    .map(box => box.value)
    .join(", ") || "None";

  const vaccinated = form["vaccinated"].value || "Not selected";

  const review = `
    <h2>PLEASE REVIEW THIS INFORMATION</h2>
    <ul>
      <li><strong>Name:</strong> ${form["first_name"].value} ${form["middle_initial"].value || ""} ${form["last_name"].value}</li>
      <li><strong>Date of Birth:</strong> ${form["dob"].value}</li>
      <li><strong>Email:</strong> ${form["email"].value}</li>
      <li><strong>Phone:</strong> ${form["phone"].value}</li>
      <li><strong>Address:</strong> ${form["address1"].value} ${form["address2"].value || ""}, ${form["city"].value}, ${form["state"].value} ${form["zip"].value}</li>
      <li><strong>Conditions:</strong> ${conditions}</li>
      <li><strong>Vaccinated:</strong> ${vaccinated}</li>
      <li><strong>Pain Level:</strong> ${document.getElementById("painRange").value}/10</li>
      <li><strong>Pain Level:</strong> ${document.getElementById("painDisplay").innerText}</li>
      <li><strong>Symptoms:</strong> ${form["symptoms"].value || "None provided"}</li>
      <li><strong>User ID:</strong> ${form["user_id"].value.toLowerCase()}</li>
      <li><strong>Password:</strong> (hidden for security)</li>
    </ul>
  `;
  document.getElementById("reviewSection").innerHTML = review;
}
function populateStates() {
  const states = [
    "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA",
    "HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
    "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
    "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
    "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY",
    "DC","PR"
  ];

  const select = document.getElementById("state");
  states.forEach(state => {
    const option = document.createElement("option");
    option.value = state;
    option.textContent = state;
    select.appendChild(option);
  });
}


