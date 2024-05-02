document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById('signupForm');

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const phoneInput = document.getElementById('phone');
    const roleInput = document.getElementById('role');

    const errorModal = document.getElementById('errorModal');
    const invalidNameModal = document.getElementById('invalidName');
    const invalidEmailModal = document.getElementById('invalidEmail');
    const invalidPasswordModal = document.getElementById('invalidPassword');
    const invalidPhoneModal = document.getElementById('invalidPhone');
    const invalidRoleModal = document.getElementById('invalidRole');

    // Close modals when clicking on the close button
    const closeButtons = document.querySelectorAll('.close');
    closeButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const modal = this.parentElement.parentElement;
            modal.style.display = 'none';
        });
    });

    // Close modals when clicking outside the modal
    window.onclick = function (event) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(function (modal) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        });
    };

    // Format phone number and remove red border if input is not empty
    function formatPhoneNumber() {
        const phoneValue = phoneInput.value.replace(/[^\d]/g, '');
        if (phoneValue.length === 10) {
            phoneInput.style.borderColor = '';
            phoneInput.value = phoneValue.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        }
        removeRedBorder(phoneInput);
    }

    // Add event listener for phone input field
    phoneInput.addEventListener('input', formatPhoneNumber);

    signupForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        // Reset validation styles
        resetValidationStyles();

        // Validate fields here
        let valid = true;

        // Check if all fields are empty
        if (!nameInput.value.trim() && !emailInput.value.trim() && !passwordInput.value.trim() && !phoneInput.value.trim() && !roleInput.value.trim()) {
            valid = false;
            errorModal.style.display = "block";
            // Set border color of all input fields to red
            markInvalid(nameInput);
            markInvalid(emailInput);
            markInvalid(passwordInput);
            markInvalid(phoneInput);
            markInvalid(roleInput);
        } else {
            errorModal.style.display = "none";

            // Check name validity
            if (!nameInput.value.trim()) {
                valid = false;
                markInvalid(nameInput);
                invalidNameModal.style.display = "block";
            } else if (!validateName(nameInput.value)) {
                valid = false;
                markInvalid(nameInput);
                invalidNameModal.style.display = "block";
            } else {
                invalidNameModal.style.display = "none";
            }


            // Check email validity
            if (!emailInput.value.trim()) {
                valid = false;
                markInvalid(emailInput);
                invalidEmailModal.style.display = "block";
            } else {
                invalidEmailModal.style.display = "none";
            }

            // Check password validity
            if (!passwordInput.value.trim()) {
                valid = false;
                markInvalid(passwordInput);
                invalidPasswordModal.style.display = "block";
            } else if (!validatePassword(passwordInput.value)) {
                valid = false;
                markInvalid(passwordInput);
                invalidPasswordModal.style.display = "block";
            } else {
                invalidPasswordModal.style.display = "none";
            }

            // Check phone validity
            if (!phoneInput.value.trim()) {
                valid = false;
                markInvalid(phoneInput);
                invalidPhoneModal.style.display = "block";
            } else if (!phoneInput.value) {
                valid = false;
                markInvalid(phoneInput);
                invalidPhoneModal.style.display = "block";
            } else {
                invalidPhoneModal.style.display = "none";
            }

            // Check role validity
            if (!roleInput.value.trim()) {
                valid = false;
                markInvalid(roleInput);
                invalidRoleModal.style.display = "block"; // Show invalid role modal
            } else {
                invalidRoleModal.style.display = "none";
            }
        }

        // If all validations pass, then proceed with form submission
        if (valid) {
            removeRedBorder(nameInput);
            removeRedBorder(emailInput);
            removeRedBorder(passwordInput);
            removeRedBorder(phoneInput);
            removeRedBorder(roleInput);
            const formData = new FormData(signupForm);
            const data = Object.fromEntries(formData.entries());

            fetch('http://localhost:7000/signup', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => response.text())
                .then((message) => {
                    // Display modal for successful sign-up
                    const modal = document.getElementById('myModal');
                    const span = document.getElementsByClassName("close")[0];
                    const userNameModal = document.getElementById('userNameModal');

                    // Set username in the modal
                    userNameModal.textContent = nameInput.value.trim();

                    // Show the modal
                    modal.style.display = "block";

                    // Close the modal when the user clicks on the 'x' button
                    span.onclick = function () {
                        modal.style.display = "none";
                    }

                    // Close the modal when the user clicks anywhere outside of it
                    window.onclick = function (event) {
                        if (event.target == modal) {
                            modal.style.display = "none";
                        }
                    }

                    // After closing the modal, redirect to the login page and set the role in local storage
                    modal.addEventListener('click', function () {
                        window.location.href = "login.html";
                        localStorage.setItem('role', data.role);
                    });
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
    });

    // Regular expression to match only letters
    function validateName(name) {
        const regex = /^[a-zA-Z\s]*$/;
        return regex.test(name);
    }

    // Function to validate password
    function validatePassword(password) {
        // Regular expression to enforce at least one uppercase letter, one lowercase letter, one digit, and minimum length of 8 characters
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return regex.test(password);
    }

    // Reset validation styles for all input fields
    function resetValidationStyles() {
        const inputFields = document.querySelectorAll('input');
        inputFields.forEach(input => input.style.borderColor = '');
    }

    // Mark input field as invalid by changing border color
    function markInvalid(inputElement) {
        inputElement.style.borderColor = 'red';
    }

    // Remove red border if input is not empty
    function removeRedBorder(inputElement) {
        if (inputElement.value.trim()) {
            inputElement.style.borderColor = '';
        }
    }
});
