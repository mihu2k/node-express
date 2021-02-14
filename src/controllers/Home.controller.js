const User = require('../models/User.model');

class HomeController {
    // [GET] /
    show(req, res, next) {
        res.render('home', {
            title: 'Home',
            user: req.user,
        });
    }
}

module.exports = new HomeController();