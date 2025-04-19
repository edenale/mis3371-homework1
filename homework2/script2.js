/*
Program name: script2.js
Author: Eden A.
Date created: 2025-04-19
Date last edited: 2025-04-19
Version: 1.0
Description: JavaScript for Homework 2 patient form - handles dynamic date, review display, password validation, and slider updates.
*/

function displayDate() {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById("date-display").innerText = today.toLocaleDateString("en-US", options);

    const dobInput = document.getElementById("dob");
    const maxDate = today.toISOString().split("T")[0];
    const minDate = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate()).toISOString().split("T")[0];
    dobInput.max = maxDate;
    dobInput.min = minDate;
}
function updatePainLevel(val) {
    document.getElementById("painDisplay").innerText = `Pain Level: ${val}/10`;
}

}

function validateForm() {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm_password").value;
    const userId = document.getElementById("userid").value.toLowerCase();

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return false;
    }

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,30}$/;
    if (!passwordPattern.test(password)) {
        alert("Password must be 8-30 characters and include at least 1 uppercase, 1 lowercase, 1 number, and 1 special character.");
        return false;
    }

    if (password.toLowerCase().includes(userId) || userId.includes(password.toLowerCase())) {
        alert("Password cannot contain or match the User ID.");
        return false;
    }

    return true;
}

function reviewData() {
    const form = document.forms["patientForm"];
    let output = `<h2>PLEASE REVIEW THIS INFORMATION</h2><ul>`;

    output += `<li>Name: ${form["first_name"].value} ${form["middle_initial"].value} ${form["last_name"].value}</li>`;
    output += `<li>Date of Birth: ${form["dob"].value}</li>`;
    output += `<li>Email: ${form["email"].value}</li>`;
    output += `<li>Phone: ${form["phone"].value}</li>`;
    output += `<li>Address:<br>${form["address1"].value}<br>${form["address2"].value}<br>${form["city"].value}, ${form["state"].value} ${form["zip"].value}</li>`;

    const illnesses = Array.from(form["illness"]).filter(i => i.checked).map(i => i.value).join(", ");
    output += `<li>Conditions: ${illnesses || "None selected"}</li>`;

    const vaccinated = form["vaccinated"].value;
    output += `<li>Vaccinated: ${vaccinated || "Not selected"}</li>`;

    const pain = document.getElementById("painRange").value;
output += `<li>Pain Level: ${pain}/10</li>`;

    output += `<li>Described Symptoms:<br>${form["symptoms"].value || "None"}</li>`;
    output += `<li>User ID: ${form["userid"].value.toLowerCase()}</li>`;
    output += `<li>Password: (hidden for security)</li>`;

    output += `</ul>`;

    document.getElementById("reviewSection").innerHTML = output;
}

/* End of script */
