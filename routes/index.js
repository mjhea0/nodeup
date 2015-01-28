var express = require('express'),
    router = express.Router(),
    passport = require('passport');


router.get('/', function(req, res) {
    res.render('index', { user: req.user });
});

router.get('/test-problem', ensureAuthenticated, function(req, res){
    res.render('test-problem', { user: req.user });
});

router.get('/account', ensureAuthenticated, function(req, res){
    res.render('account', { user: req.user });
});

router.get('/auth/github',
    passport.authenticate('github'),
    function(req, res){});

router.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/');
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/');
}

router.post('/github', function(req, res){
  res.status(200).send('hi!');
});


module.exports = router;
