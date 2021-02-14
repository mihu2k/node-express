class AuthController {
    // [GET] /auth/login
    showLoginPage(req, res, next) {
        if (req.session.messages) {
            var message = req.session.messages[req.session.messages.length - 1];
        }
        delete req.session.messages;
        res.render('login', {
            title: 'Login',
            message: message || null,
        });
    }

    // [POST] /auth/login
    loginToHomePage(req, res, next) {
        res.render('home', {
            title: 'Home',
            user: req.user,
        });
    }
}

module.exports = new AuthController();