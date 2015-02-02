var express = require('express'),
    router = express.Router(),
    passport = require('passport');
    gist = require('../helpers/gist');


router.get('/', function(req, res) {
  if (req.user) {
    var Exercise = require('../models/exercises.js');
    Exercise.find({}, function(err, exercises) {
      res.render('index', { user: req.user, exercises: exercises});
    });
  } else {
    res.render('index', { user: req.user });
  }
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

  var request = require('request');

  var gistID = req.body.data;
  var url = 'https://api.github.com/gists/'+gistID;
  var authToken = req.user.token;

  var options = {
    method: 'get',
    json: true,
    url: url,
    headers : {
      'User-Agent': 'test',
      'Authorization': 'token '+authToken // do not hard code!
    }
  };

  request(options, url, function(err, resp, body) {
      console.log(body.url);
      res.status(200).send({url:body.url});
    });

});


module.exports = router;
