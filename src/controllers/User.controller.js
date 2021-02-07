const User = require('../models/User.model');

User.create(
    {
        username: 'mihu2k',
        password: '123456',
        name: 'Trương Minh Hưng',
        group: '18050202',
        faculty: 'Information Technology',
        avatar: '/images/google.svg',
    }, function(err, user) {
        if (err) {
            return console.log('error: ', err);
        }
        return console.log(user);
    }
);