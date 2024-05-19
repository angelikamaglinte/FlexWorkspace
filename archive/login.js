document.getElementById("loginForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    
    fetch('https://flexworkspace-server.onrender.com/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Login failed');
        }
        return response.json();
    })
    .then((data) => {
        // Store token in localStorage
        window.localStorage.setItem('token', data.accessToken);
        
        // Redirect user based on role
        if (data.role === 'owner') {
            window.location.href = 'owner-page.html';
        } else if (data.role === 'coworker') {
            window.location.href = 'coworker-page.html'; 
        } else {
            // Handle other roles if needed
            console.error('Invalid role:', data.role);
        }
    })
    .catch((error) => {
        console.error("Error:", error);
        document.getElementById("loginMessage").textContent = "Login failed";
    });
});