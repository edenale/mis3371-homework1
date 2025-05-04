/*
Program name: extracredit.js
Author: Eden A.
Date created: 2025-05-04
Version: 1.0
Description: JavaScript for Extra Credit form - localStorage, modal review, cookie handling.
*/

function initializePage() {
    const today = new Date();
    document.getElementById("date-display").textContent = today.toDateString();

    const firstName = getCookie("firstName");
    const welcomeMsg = document.getElementById("welcomeMessage");
    const storedName = document.getElementById("storedName");
    const newUserLabel = document.getElementById("newUserLabel");

    if (firstName) {
        welcomeMsg.textContent = `Welcome back, ${firstName}`;
        storedName.textContent = firstName;
        newUserLabel.style.display = "inline";
        document.getElementById("firstName").value = firstName;
        loadLocalStorage();
    } else {
        welcomeMsg.textContent = "Welcome new user";
    }
}

function saveToLocalStorage(field) {
    const value = document.getElementById(field).value;
    localStorage.setItem(field, value);
}

function loadLocalStorage() {
    ["firstName", "email", "phone"].forEach(field => {
        const value = localStorage.getItem(field);
        if (value) document.getElementById(field).value = value;
    });
}

function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = `${name}=${value};${expires};path=/`;
}

function getCookie(name) {
    const cname = name + "=";
    const decoded = decodeURIComponent(document.cookie);
    const ca = decoded.split(';');
    for (let c of ca) {
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(cname) === 0) return c.substring(cname.length, c.length);
    }
    return "";
}

function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    localStorage.clear();
}

function resetUser() {
    deleteCookie("firstName");
    document.getElementById("patientForm").reset();
    document.getElementById("welcomeMessage").textContent = "Welcome new user";
    document.getElementById("newUserLabel").style.display = "none";
}

function reviewData() {
    const form = document.getElementById("patientForm");
    const firstName = form.firstName.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const remember = document.getElementById("rememberMe").checked;

    let output = `<p><strong>Name:</strong> ${firstName}</p>`;
    output += `<p><strong>Email:</strong> ${email}</p>`;
    output += `<p><strong>Phone:</strong> ${phone}</p>`;

    document.getElementById("reviewOutput").innerHTML = output;
    document.getElementById("modalReview").style.display = "block";

    if (remember) setCookie("firstName", firstName, 2);
    else deleteCookie("firstName");
}

function closeModal() {
    document.getElementById("modalReview").style.display = "none";
}

function submitData() {
    alert("Thank you for your submission. We will contact you shortly.");
    closeModal();
    document.getElementById("patientForm").reset();
    localStorage.clear();
}

