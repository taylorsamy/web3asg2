const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../models/User.js');
const localOpt = {
    usernameField: 'email',
    passwordField: 'password'
};

const strategy = new LocalStrategy(localOpt, async (email, password, done) => {
    try {

        const userChosen = await UserModel.findOne({ email: email });
        console.log(userChosen);
        if (!userChosen) {
            
            return done(null, false, { message: 'Email not found' });
        }
     
        const validate = await userChosen.isValidPassword(password);
        if (!validate) {
            return done(null, false, { message: 'Wrong Password' });
        }
    
        return done(null, userChosen, { message: 'Logged in Successfully' });
    }
    catch (error) {
        return done(error);
    }
});

passport.use('localLogin', strategy);

passport.serializeUser((user, done) => done(null, user.email));
passport.deserializeUser((email, done) => {
    UserModel.findOne({ email: email })
        .then((user) => done(null, user));
});