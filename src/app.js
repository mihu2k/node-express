require('dotenv').config();
require('./config/passport-setup');
const path = require('path');
const express = require('express');
const app = express();
const port = 3000;
const db = require('./config/db/index');
const route = require('./routes/index.route');
const cookieSession = require('cookie-session');
const passport = require('passport');
const flash = require('express-flash');

// Connecting to MongoDB
db.connect();

// Static files
app.use(express.static('public'));

// Get body in form[POST]
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Config + Encode cookie
app.use(cookieSession({
    maxAge: 3600 * 24 * 1000,
    keys: [process.env.COOKIE_KEY],
}));

// Message flash
app.use(flash());

// Init passport
app.use(passport.initialize());
app.use(passport.session());

// Def routes
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}/auth/login`);
});
