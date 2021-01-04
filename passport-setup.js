const passport = require('passport');
const uri = "https://unsigned-kamus-v3.herokuapp.com";

var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
});
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: "763753461904-24kvubmtaij71m32o8f1k9ju9cp9dhkf.apps.googleusercontent.com",
    clientSecret: "jGnm4cWd0fZ8apxXb0g7d52M",
    callbackURL: `${uri}/google/callback`
    },
    function(accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));

