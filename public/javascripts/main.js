// 
var btnLoginWithGoogle = document.querySelector('.btn-login-with-gg');

if (btnLoginWithGoogle) {
    btnLoginWithGoogle.onclick = function() {
        window.location.href = '/auth/google';
    }
}

// 
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