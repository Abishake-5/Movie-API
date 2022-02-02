const passport = require('passport'),
LocalStrategy = require('passport-local').Strategy,
Models = require('./models'),
passportJWT = require('passport-jwt');

let Users = Models.User,
JWTStrategy = passportJWT.Strategy,
ExtractJWT = passportJWT.ExtractJwt;

passport.use(new LocalStrategy({
    usernameField: 'userName',
    passwordField: 'Password'
    // This is where username and password is entered
},(userName, password, callback) =>{
    // it's then sent as a param to check for validation
    console.log(userName + ' ' + password);
    Users.findOne({userName: userName }, (error, user)=>{
        // the above code is looking to match the username with the username in db
        if (error){
            console.log(error);
            return callback(error);
        }
        if (!user) {
            console.log('incorrect Username');
            return callback(null, false, {message: 'Incorrect username or password.'});
        }
         if (!user.validatePassword(password)) {
      console.log('incorrect password');
      return callback(null, false, {message: 'Incorrect password.'});
    }
        console.log('finished');
        return callback(null, user);
    });
}));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey:'your_jwt_secret'
},(JwtPayload, callback) =>{
    return Users.findById(JwtPayload._id)
    .then((user)=>{
        return callback(null,user);
    })
    .catch((error)=>{
        return callback(error)
    });
}));
