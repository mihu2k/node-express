const authRouter = require('./auth.route');
const homeRouter = require('./home.route');
const userRouter = require('./user.route');
const departmentRouter = require('./department.route');
const profileRouter = require('./profile.route');
const notificationRouter = require('./notification.route');
const { checkAuth, isAdmin } = require('../lib/middleware');

const route = app => {
    app.use('/notification', checkAuth, notificationRouter);
    app.use('/profile', checkAuth, profileRouter);
    app.use('/department', checkAuth, departmentRouter);
    app.use('/user', checkAuth, isAdmin, userRouter);
    app.use('/auth', authRouter);
    app.use('/', checkAuth, homeRouter);
}

module.exports = route;