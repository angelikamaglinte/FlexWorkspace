document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.getElementById('signup-form');
    
    signupForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const role = document.getElementById('role').value; // Capture selected role

        try {
            const response = await fetch('https://flexworkspace-backend.onrender.com/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    role: role // Include selected role in request body
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Signup successful, redirect to login page
                window.location.href = '/login'; // Redirect to login page
            } else {
                // Signup failed, display error message
                alert(data.msg);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    });
});
