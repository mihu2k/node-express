const authRouter = require('./auth.route');
const homeRouter = require('./home.route');

const route = app => {
    app.use('/auth', authRouter);
    app.use('/', homeRouter);
}

module.exports = route;