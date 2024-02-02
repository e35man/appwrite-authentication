import authService from './AuthServices.js';

document.addEventListener('DOMContentLoaded', async () => {
    
    const userNameElement = document.getElementById('userName');
    const logoutButton = document.getElementById('logoutButton');

    try {
        const user = await authService.getUser();

        if (user) {
            userNameElement.textContent = `Email: ${user.email}`;
        } else {
            userNameElement.textContent = 'Failed to fetch user details'
        }
    } catch (error) {
        console.error(error);
        userNameElement.textContent = 'An error occurred while fetching user details'
    }

    logoutButton.addEventListener('click', async () => {
        try {
            await authService.logout();
            window.location.href = 'index.html';
        } catch (error) {
            alert('An error occurred during logout.')
        }
    });
});