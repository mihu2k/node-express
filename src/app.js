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
const methodOverride = require('method-override');
const socket = require('socket.io');
const rateLimit = require("express-rate-limit");

// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100 // limit each IP to 100 requests per windowMs
// });
  
// //  apply to all requests
// app.use(limiter);

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

// Override method
app.use(methodOverride('_method'));

// Def routes
route(app);

// 404 Not found page
app.get('*', (req, res) => {
    res.status(404).render('notFound', {title: 'Error'});
});

const server = app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}/auth/login`);
});

// Setup socket.io
const io = socket(server);
global.io = io;
