// dependencies
var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    util = require('util'),
    swig = require('swig'),
    GitHubStrategy = require('passport-github').Strategy,
    flash = require('connect-flash'),
    mongoose = require('mongoose');

// config
var config = require('./config/_config');

// routes
var routes = require('./routes/index');

// create express instance
var app = express();

// connect to the database
mongoose.connect('mongodb://localhost/nodeup');

// create a user model
var User = mongoose.model('user', {
    oauthID: Number,
    name: String,
    created: Date
});

// view engine setup for templates
app.engine('html', swig.renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');


// passport github strategy
passport.use(new GitHubStrategy({
    clientID: config.github_client_id,
    clientSecret: config.github_client_secret,
    callbackURL: config.github_callback_url
},
function(accessToken, refreshToken, profile, done) {
    User.findOne({ oauthID: profile.id }, function(err, user) {
        if(err) { console.log(err); }
        if (!err && user !== null) {
            done(null, user);
        } else {
            user = new User({
                oauthID: profile.id,
                name: profile.displayName,
                created: Date.now()
            });
            user.save(function(err) {
                if(err) {
                    console.log(err);
                } else {
                    console.log("saving user ...");
                    done(null, user);
                }
            });
        }
    });
}));

// middeleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride());
app.use(flash());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));


// serialize and deserialize
passport.serializeUser(function(user, done) {
    console.log('serializeUser: ' + user._id);
    done(null, user._id);
});
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user){
        console.log(user);
        if(!err) done(null, user);
        else done(err, null);
    });
});

// main routes
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
