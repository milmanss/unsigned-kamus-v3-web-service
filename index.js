// set up library
const express = require('express');
const bodyParser = require('body-parser');
const port = parseInt(process.env.PORT, 10) || 3000;
const path = require('path');
const cors = require('cors');

// set up express app
const app = express();

// set up cors
app.use(cors());

// handle change body to json
app.use(bodyParser.json());

// set up passport for oauth
const passport = require('passport');
const cookieSession = require('cookie-session');
require('./passport-setup.js');

// creating cookie
app.use(cookieSession({
    name: 'unsigned-session',
    keys: ['key1', 'key2']
}));

// init passport & session
app.use(passport.initialize());
app.use(passport.session());

// handle static content
app.use(express.static('./app/public'));

// path to google page
app.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
    });

// handle dashboard page
app.get('/dashboard', function(req, res){
    res.sendFile(path.join(__dirname + '/app/public/dashboard.html'));
});

// handle add page
app.get('/add', function(req, res){
    res.sendFile(path.join(__dirname + '/app/public/add-word.html'));
});

// handle logout page
app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})

// listen for request
app.listen(port, function(){
    console.log(`now listening on port ${port}`);
});

