const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/Auth.controller');
const { checkNotAuth, checkEmail, validateLoginForm } = require('../lib/middleware');

router.get('/login', checkNotAuth, authController.showLoginPage);
router.post('/login', validateLoginForm, passport.authenticate('local',
    { successRedirect: '/', failureRedirect: '/auth/login', failureFlash: true }));

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], }));
router.get('/google/callback', passport.authenticate('google',
    { failureRedirect: '/auth/login', failureMessage: true }), checkEmail, (req, res) => res.redirect('/'));

module.exports = router;