// document.addEventListener('DOMContentLoaded', function () {
//     const loginForm = document.getElementById('login-form');
    
//     loginForm.addEventListener('submit', async function (event) {
//         event.preventDefault();

//         const email = document.getElementById('email').value;
//         const password = document.getElementById('password').value;

//         try {
//             const response = await fetch('https://flexworkspace-backend.onrender.com/api/auth/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     email: email,
//                     password: password
//                 })
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 // Login successful, save token and redirect to dashboard or homepage
//                 localStorage.setItem('token', data.token);
//                 window.location.href = '/dashboard'; // Redirect to dashboard
//             } else {
//                 // Login failed, display error message
//                 alert(data.msg);
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             alert('An error occurred. Please try again.');
//         }
//     });
// });

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    
    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('https://flexworkspace-backend.onrender.com/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Login successful, save token and redirect based on user role
                localStorage.setItem('token', data.token);

                // Decode the token to get user role
                const decodedToken = jwt_decode(data.token);
                const userRole = decodedToken.role;

                // Redirect based on user role
                if (userRole === 'host') {
                    window.location.href = '/dashboard-host.html'; // Redirect to host dashboard
                } else if (userRole === 'guest') {
                    window.location.href = '/dashboard-guest.html'; // Redirect to guest dashboard
                } else {
                    // Handle invalid role or other cases
                    console.error('Invalid user role');
                }
            } else {
                // Login failed, display error message
                alert(data.msg);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    });
});
