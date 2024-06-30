// Toggle the dropdown menu visibility
function toggleDropdown() {
    var dropdownContent = document.getElementById("work-with-us-dropdown-content");
    if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
    } else {
        dropdownContent.style.display = "block";
    }
}

// Show the specified pop-up window
function showPopup(popupId) {
    var popup = document.getElementById(popupId);
    if (popup) {
        popup.classList.remove('hidden');
    }
}

// Close the specified pop-up window
function closePopup(popupId) {
    var popup = document.getElementById(popupId);
    if (popup) {
        popup.classList.add('hidden');
    }
}

// Check if user is logged in and show/hide appropriate links
document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('token');
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const logoutBtn = document.getElementById('logout-btn');

    console.log('Token:', token); // Debugging: Check if the token is being read correctly

    if (token) {
        loginBtn.classList.add('hidden');
        signupBtn.classList.add('hidden');
        logoutBtn.classList.remove('hidden');
        console.log('User is logged in, showing logout');
    } else {
        loginBtn.classList.remove('hidden');
        signupBtn.classList.remove('hidden');
        logoutBtn.classList.add('hidden');
        console.log('User is not logged in, hiding logout');
    }

    // Add event listeners for login and sign-up buttons
    loginBtn.addEventListener('click', function () {
        showPopup('login-popup');
    });

    signupBtn.addEventListener('click', function () {
        showPopup('signup-popup');
    });

    // Add event listener for logout
    logoutBtn.addEventListener('click', function () {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        window.location.href = 'index.html';
    });

    // Add event listeners for close buttons on pop-ups
    document.querySelectorAll('.close').forEach(function (closeButton) {
        closeButton.addEventListener('click', function () {
            closePopup(closeButton.closest('.popup').id);
        });
    });
});


// OLD WORKING CODE
// // Toggle the dropdown menu visibility
// function toggleDropdown() {
//     var dropdownContent = document.getElementById("work-with-us-dropdown-content");
//     if (dropdownContent.style.display === "block") {
//         dropdownContent.style.display = "none";
//     } else {
//         dropdownContent.style.display = "block";
//     }
// }

