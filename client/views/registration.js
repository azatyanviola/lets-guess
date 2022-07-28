/* eslint-disable no-useless-escape */
/* eslint-disable no-undef */

const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
form.addEventListener('submit', submitEvent => {
    submitEvent.preventDefault();
    checkInputs();
});
function checkInputs() {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();
    if (usernameValue === '') {
        setErrorFor(username, 'Username cannot be blank');
    } else {
        setSuccessFor(username);
    }

    if (emailValue === '') {
        setErrorFor(email, 'Email cannot be blank');
    } else if (!isEmail(emailValue)) {
        setErrorFor(email, 'Not a valid email');
    } else {
        setSuccessFor(email);
    } 

    const numberCheck = /\d/g;
    const lowerCaseCheck = /^(?=.*[a-z]).*$/;
    const upperCaseCheck = /^(?=.*[A-Z]).*$/;
    const specialSymbolCheck =    /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
    const languageCheck = /[^a-zA-Zа-яА-Я\u0561-\u0587\u0531-\u0556-]+/g;
    if (passwordValue === '') {
        setErrorFor(password, 'Password cannot be blank');
    } else if (passwordValue.length < 8) {
        setErrorFor(password, 'Password length must be at least 8 characters');
    } else if (passwordValue.length > 16) {
        setErrorFor(password, 'Password length must not exceed 16 characters');
    } else if (!numberCheck.test(passwordValue)) {
        setErrorFor(password, 'Password must have at least one digit');
    } else if (!lowerCaseCheck.test(passwordValue)) {
        setErrorFor(password, 'Password must have at least one lower case');
    } else if (!upperCaseCheck.test(passwordValue)) {
        setErrorFor(password, 'Password must have at least one upper case');
    } else if (!specialSymbolCheck.test(passwordValue)) {
        setErrorFor(password, 'Password must have at least one symbol');
    } else if (!languageCheck.test(passwordValue)) {
        setErrorFor(password, 'Password must be Latin, Armenian or Russian');
    } else {
        setSuccessFor(password);
    }

    if (password2Value === '') {
        setErrorFor(password2, 'Password2 cannot be blank');
    } else if (passwordValue !== password2Value) {
        setErrorFor(password2, 'Passwords does not match');
    } else {
        setSuccessFor(password2);
    }
}
function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.innerText = message;
}
function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}
function isEmail(email) {
    return /^(([^<>() \ [\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
