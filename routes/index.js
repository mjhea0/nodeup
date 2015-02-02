var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    gist = require('../helpers/gist'),
    Exercise = require('../models/exercises.js'),
    request = require('request');


router.get('/', function(req, res) {
  if (req.user) {
    Exercise.find({}, function(err, exercises) {
      res.render('index', { user: req.user, exercises: exercises});
    });
  } else {
    res.render('index', { user: req.user });
  }
});


router.get('/problems/:problemID', ensureAuthenticated, function(req, res){
  Exercise.find({_id:req.params.problemID}, function(err, exercise) {
    res.render('problem', { user: req.user, exercise: exercise[0] });
  });
});


router.post('/github', function(req, res){

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
      console.log(body.html_url);
      res.status(200).send({url:body.html_url});
    });

});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
}

function addGist() {
  // add solution to the exercises collection
}

module.exports = router;
