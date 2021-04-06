const User = require('../models/User.model');

class UserController {
    // [GET] /user/create
    async create(req, res, next) {
        const listUser = await User.find({ username: {$ne: null} }).select('username name');
        res.render('users/create', {
            title: 'Manage | Create',
            user: req.user,
            listUser: JSON.stringify(listUser),
        });
    }

    // [GET] /user
    show(req, res, next) {
        User.find({ userType: 'department' })
            .then(departments => {
                res.render('users/show', {
                    title: 'Manage',
                    user: req.user,
                    departments,
                });
            })
            .catch(next);
    }

    // [POST] /user/storage
    storage(req, res, next) {
        const formData = { ...req.body };
        formData.userType = 'department';
        formData.department = [req.body.name];
        const department = new User(formData);
        department
            .save()
            .then(() => res.redirect('/user'))
            .catch(error => {});
    }

    // [GET] /user/:id/authorized
    authorized(req, res, next) {
        User.findById(req.params.id)
            .then(department => {
                res.render('users/authorized', {
                    title: 'Manage | Authorized',
                    user: req.user,
                    department,
                    departmentUser: JSON.stringify(department),
                });
            })
            .catch(next);
    }

    // [PUT] /user/:id
    update(req, res, next) {
        User.updateOne({ _id: req.params.id }, { department: req.body.department })
            .then(() => res.redirect('/user'))
            .catch(next);
    }
}

module.exports = new UserController();
