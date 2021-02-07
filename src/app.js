const path = require('path');
const express = require('express');
const app = express();
const port = 3000;
const db = require('./config/db/index');

// Connecting to MongoDB
db.connect();

// Static files
app.use(express.static('public'));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login',
    });
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

// const User = require('./models/User.model');

// User.create(
//     {
//         username: 'mihu2k',
//         password: '123456',
//         name: 'Trương Minh Hưng',
//         group: '18050202',
//         faculty: 'Information Technology',
//         avatar: '/images/google.svg',
//     }, function(err, user) {
//         if (err) {
//             return console.log('error: ', err);
//         }
//         return console.log(user);
//     }
// );