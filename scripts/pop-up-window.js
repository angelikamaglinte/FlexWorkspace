document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("login-btn");
    const signupBtn = document.getElementById("signup-btn");
    const loginPopup = document.getElementById("login-popup");
    const signupPopup = document.getElementById("signup-popup");
    const signUpInstead = document.getElementById("sign-up-instead-link");
    const logInInstead = document.getElementById("log-in-instead-link");
    const closeLoginPopupBtn = loginPopup.querySelector('.close');
    const closeSignupPopupBtn = signupPopup.querySelector('.close');

    loginBtn.addEventListener("click", () => {
        loginPopup.style.display = "block";
    });

    signupBtn.addEventListener("click", () => {
        signupPopup.style.display = "block";
    });

    signUpInstead.addEventListener("click", () => {
        loginPopup.style.display = "none";
        signupPopup.style.display = "block";
    });

    logInInstead.addEventListener("click", () => {
        loginPopup.style.display = "block";
        signupPopup.style.display = "none";
    })

    window.addEventListener("click", (event) => {
        if (event.target === loginPopup) {
            loginPopup.style.display = "none";
        }
        if (event.target === signupPopup) {
            signupPopup.style.display = "none";
        }
    });

    closeLoginPopupBtn.addEventListener("click", () => {
        loginPopup.style.display = "none";
    });

    closeSignupPopupBtn.addEventListener("click", () => {
        signupPopup.style.display = "none";
    });
});

function closePopup(popupId) {
    document.getElementById(popupId).style.display = "none";
}
