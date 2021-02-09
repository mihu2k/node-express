const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/login', function(req, res) {
    if (req.session.messages) {
        var message = req.session.messages[req.session.messages.length - 1];
    }
    delete req.session.messages;
    res.render('login', {
        title: 'Login',
        message: message || null,
    })
});

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
}));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/auth/login', failureMessage: true }), (req, res) => {
    res.redirect('/');
});

module.exports = router;