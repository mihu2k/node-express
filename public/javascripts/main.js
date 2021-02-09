var btnLoginWithGoogle = document.querySelector('.btn-login-with-gg');

if (btnLoginWithGoogle) {
    btnLoginWithGoogle.onclick = function() {
        window.location.href = '/auth/google';
    }
}