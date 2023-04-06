require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('express-flash');
const passport = require('passport');
const helper = require('./scripts/helpers.js');
const routes = require("./routes/api") // new
require('./scripts/mongoDataConnector.js').connect();


const app = express()
app.use("/api", routes) // new


app.set('views', './views');
app.set('view engine', 'ejs');

app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser('oreos'));
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

require('./scripts/auth.js');

app.get('/', helper.ensureAuthenticated, (req, res) => {
  res.render('home.ejs',
    { user: req.user });
});

// login and logout routers here
app.get('/login', (req, res) => {
  if(req.isAuthenticated()){
    return res.redirect('/');
  }
  res.render('login.ejs', { message: req.flash('error'), user: null });
});

app.post('/login', async (req, resp, next) => {
  // use passport authentication to see if valid login
  passport.authenticate('localLogin',
    {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true
    })(req, resp, next);
});

app.get('/logout', (req, res) => {
  if(!req.isAuthenticated()){
    return res.redirect('/');
  }
  req.logout(function (err) {
    if (err) { return next(err); }
    req.flash('info', 'You were logged out');
    res.render('login', { message: req.flash('info'), user: null });
  });


});

// customize the 404 error with our own middleware function
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
});

const port = process.env.port;
app.listen(port, function () {
  console.log("Server running at port= " + port);
});


