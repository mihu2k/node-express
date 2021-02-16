// When click btn login GG, app redirect /auth/google
var btnLoginWithGoogle = document.querySelector('.btn-login-with-gg');

if (btnLoginWithGoogle) {
    btnLoginWithGoogle.onclick = function() {
        window.location.href = '/auth/google';
    }
}

// Hidden error when focus on input
var inputsElementinLogin = document.querySelectorAll('.form-control');
var errorElement = document.querySelector('.alert.alert-danger');

if (inputsElementinLogin) {
    inputsElementinLogin.forEach(input => {
        input.onfocus = function() {
            if (errorElement) {
                errorElement.style.display = 'none';
            }
        }
    });
}

// Handle btn hamburger
var menuBtnElement = document.querySelector('.header__nav-icon.ti-menu');
var modalOverlay = document.querySelector('.overlay');
var navElement = document.querySelector('.header__navigation');

if (menuBtnElement) {
    menuBtnElement.onclick = function() {
        modalOverlay.style.display = 'block';
        navElement.style.opacity = '1';
        navElement.style.transform = 'translateX(0)';
    }
}

if (modalOverlay) {
    modalOverlay.onclick = function() {
        modalOverlay.style.display = 'none';
        navElement.style.opacity = '0';
        navElement.style.transform = 'translateX(-100%)';
    }
}

// Handle btn triangle down for user
var menuUserBtn = document.querySelector('.header__nav-item.header__nav-icon-down');
var menuUser = document.querySelector('.header__nav-user-menu');
var overlayTransparent = document.querySelector('.overlay-transparent');

if (menuUserBtn) {
    menuUserBtn.onclick = function() {
        
        if (menuUser.style.transform === 'scale(0)') {
            menuUser.style.transform = 'scale(1)';
            overlayTransparent.style.display = 'block';
        } else {
            menuUser.style.transform = 'scale(0)';
            overlayTransparent.style.display = 'none';
        }
    }
}

// Handle remember me
var usernameElement = document.getElementById('username');
var passwordElement = document.getElementById('password');
var rememberMeElement = document.getElementById('rememberMe');

function handleRememberMe() {
    if (rememberMeElement.checked === true) {
        localStorage.setItem('rememberMe', 'true');
        localStorage.setItem('username', usernameElement.value);
        localStorage.setItem('password', passwordElement.value);
    } else {
        localStorage.setItem('rememberMe', 'false');
        localStorage.setItem('username', '');
        localStorage.setItem('password', '');
    }
}

if (rememberMeElement) {
    rememberMeElement.onclick = function() {
        handleRememberMe();
    }
}

if (usernameElement) {
    usernameElement.onkeydown = function() {
        handleRememberMe();
    }
}

if (passwordElement) {
    passwordElement.onkeydown = function() {
        handleRememberMe();
    }
}

if (localStorage.rememberMe === 'true') {
    rememberMeElement.checked = true;
    usernameElement.value = localStorage.getItem('username');
    passwordElement.value = localStorage.getItem('password');
} else {
    rememberMeElement.checked = false;
}