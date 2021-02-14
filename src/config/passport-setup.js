const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User.model')

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        })
});

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
        const isValidEmail = profile._json.email.includes('@student.tdtu.edu.vn');
        if (!isValidEmail) {
            return done(null, false, { message: 'The email must be in the form: mssv@student.tdtu.edu.vn' });
        } else {
            User.findOne({ googleId: profile.id})
            .then(user => {
                if (user) {
                    done(null, user);
                } else {
                    new User({
                        googleId: profile.id,
                        name: profile.displayName,
                        email: profile._json.email,
                        avatar: profile._json.picture,
                    }).save()
                        .then(newUser => {
                            done(null, newUser);
                        })
                }
            })
        }
    })
);

passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({ username: username.trim(), password })
        .then(user => {
            if (!user) {
                return done(null, false, { message: 'Incorrect username or password' });
            }
            return done(null, user);
        })
        .catch(err => done(err))
}));