const User = require('../models/User.model');

class DepartmentController {
    // [GET] /department/change-password
    showChangePassword(req, res, next) {
        res.render('departments/changePassword', {
            title: 'Change Password',
            user: req.user,
            password: JSON.stringify(req.user.password),
        });
    }

    // [PATCH] /department/change-password
    update(req, res, next) {
        User.updateOne({
            username: req.user.username,
            password: req.body.currentPassword
        }, { password: req.body.confirmPassword })
            .then(() => res.redirect('/'))
            .catch(next);
    }
}

module.exports = new DepartmentController();