const User = require('../models/User.model');

class HomeController {
    // [GET] /
    show(req, res, next) {
        res.render('home', {
            title: 'Home',
            user: req.user,
        });
    }

    // [GET] /logout
    logout(req, res) {
        req.logout();
        res.redirect('/auth/login');
    }
}

module.exports = new HomeController();