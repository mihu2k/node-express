const authRouter = require('./auth.route');
const homeRouter = require('./home.route');
const userRouter = require('./user.route');
const departmentRouter = require('./department.route');
const profileRouter = require('./profile.route');
const notificationRouter = require('./notification.route');

const checkUserType = (req, res, next) => {
    var isAdmin = req.user.userType === 'admin';
    if (isAdmin) {
        return next();
    }
    res.redirect('/');
};

const route = app => {
    app.use('/notification', notificationRouter);
    app.use('/profile', profileRouter);
    app.use('/department', departmentRouter);
    app.use('/user', checkUserType, userRouter);
    app.use('/auth', authRouter);
    app.use('/', homeRouter);
}

module.exports = route;