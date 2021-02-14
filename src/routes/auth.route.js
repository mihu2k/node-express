const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/Auth.controller');

const checkEmail = (req, res, next) => {
    const isValidEmail = req.user.email.includes('@student.tdtu.edu.vn');
    
    if (!isValidEmail) return req.logout();
    else next();
}

router.get('/login', authController.showLoginPage);
router.post('/login', passport.authenticate('local',
    { successRedirect: '/', failureRedirect: '/auth/login', failureFlash: true }));

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], }));
router.get('/google/callback', passport.authenticate('google',
    { failureRedirect: '/auth/login', failureMessage: true }), checkEmail, (req, res) => res.redirect('/'));

module.exports = router;