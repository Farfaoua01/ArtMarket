const passport = require('passport');
require("dotenv").config();
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
        // This function is called when the user is authenticated
        // You can handle user creation, login, or other actions here
        console.log(profile);
        // Example: Find or create user in the database
        // User.findOrCreate({ googleId: profile.id }, (err, user) => {
        //     return done(err, user);
        // });
    }));

// Serialize user to store in session
passport.serializeUser((user, done) => {
    done(null, user);
});

// Deserialize user from session
passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = passport;