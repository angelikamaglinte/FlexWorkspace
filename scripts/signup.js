document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.getElementById('signup-form');

    signupForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const firstName = document.getElementById('signup-firstname').value;
        const lastName = document.getElementById('signup-lastname').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        // const role = document.getElementById('signup-role').value; // Capture selected role

        try {
            const response = await fetch('https://flexworkspace-backend.onrender.com/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    // name: name,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                    // role: role // Include selected role in request body
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Signup successful, redirect to login page
                window.location.href = 'index.html'; // Redirect to login page
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
