const authRouter = require('./auth.route');
const homeRouter = require('./home.route');
const userRouter = require('./user.route');

const checkUserType = (req, res, next) => {
    var isAdmin = req.user.userType === 'admin';
    if (isAdmin) {
        return next();
    }
    res.redirect('/');
};

const route = app => {
    app.use('/user', checkUserType, userRouter);
    app.use('/auth', authRouter);
    app.use('/', homeRouter);
}

module.exports = route;