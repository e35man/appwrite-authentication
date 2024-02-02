import authService from './AuthServices.js';

const password = document.querySelector('#password')
const email = document.querySelector('#email')
const formTitle = document.getElementById('pageTitle')
const submitButton = document.getElementById('submitButton')
const toggleMessage = document.querySelector('#toggleMessage')
let isLoginForm = true

document.body.addEventListener('click', (event) => {
    const target = event.target;
    if (target.matches('#toggleForm')) {
        isLoginForm = !isLoginForm;

        if (isLoginForm) {
            formTitle.textContent = 'Login'
            submitButton.textContent = 'Login';
            toggleMessage.innerHTML = "Don't have an account? <a href='javascript:void(0)' id='toggleForm'>Sign Up</a>";
        } else {
            formTitle.textContent = 'Sign Up'
            submitButton.textContent = 'Sign Up';
            toggleMessage.innerHTML = "Already have an account? <a href='javascript:void(0)' id='toggleForm'>Login</a>";
        }
    }
});

submitButton.addEventListener('click', async () => {
    try {
        if (isLoginForm) {
            const response = await authService.login({"email":email.value, "password":password.value});
            if (response) {
                window.location.href = 'home.html'
            } else {
                alert(response)
            }
        } else {
            const response = await authService.createAccount({"email":email.value,"password":password.value});
                alert('Account created. Login to continue')
        }
    } catch (error) {
        alert(error.message);
    }
})