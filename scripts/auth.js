document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    
    
    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {

            // Retrieve token and user ID from local storage
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');

            // Log token and user ID to console
            console.log('Token:', token);
            console.log('User ID:', userId);

            const response = await fetch('https://flexworkspace-backend.onrender.com/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token,  // Include the authentication token
                    'x-user-id': userId     // Include the user ID
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Login successful, save token and redirect to dashboard or homepage
                localStorage.setItem('token', data.token);
                
                // Decode the token to get user role
                const decodedToken = jwt_decode(data.token);
                console.log(decodedToken); // Log the decoded token to check its structure
                localStorage.setItem('userId', decodedToken.user.id);

                // Redirect based on user role
                const userRole = decodedToken.user.role;
                if (userRole === 'host') {
                    window.location.href = 'dashboard-host.html'; // Redirect to host dashboard
                } else if (userRole === 'guest') {
                    window.location.href = 'dashboard-guest.html'; // Redirect to guest dashboard
                } else {
                    // Handle invalid role or other cases
                    alert('Invalid user role');
                }

                // Fetch user information after successful login
                // fetchUserInfo();
            } else {
                // Login failed, display error message
                alert(data.msg);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    });

    // // Function to fetch user information and display user name
    // async function fetchUserInfo() {
    //     try {
    //         const token = localStorage.getItem('token');
    //         const response = await fetch('https://flexworkspace-backend.onrender.com/api/auth/user', {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'x-auth-token': token
    //             }
    //         });

    //         if (response.ok) {
    //             const userData = await response.json();
    //             displayUserName(userData.name);
    //         } else {
    //             console.error('Failed to fetch user information');
    //         }
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // }

    // // Function to display user name
    // function displayUserName(userName) {
    //     const userNameElement = document.getElementById('user-name');
    //     if (userNameElement) {
    //         userNameElement.textContent = userName;
    //     }
    // }
});


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
                
//                 // Decode the token to get user role
//                 const decodedToken = jwt_decode(data.token);
//                 const userRole = decodedToken.role;

//                 // Redirect based on user role
//                 if (userRole === 'host') {
//                     window.location.href = 'dashboard-host.html'; // Redirect to host dashboard
//                 } else if (userRole === 'guest') {
//                     window.location.href = 'dashboard-guest.html'; // Redirect to guest dashboard
//                 } else {
//                     // Handle invalid role or other cases
//                     alert('Invalid user role');
//                 }
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
