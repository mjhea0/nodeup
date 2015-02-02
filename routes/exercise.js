var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    Exercise = require('../models/exercises.js'),
    request = require('request');
    cheerio = require('cheerio');


router.get('/problems/:problemID', ensureAuthenticated, function(req, res){
  Exercise.find({_id:req.params.problemID}, function(err, exercise) {
    var url = 'https://github.com/mjhea0/nodeup/blob/master/exercises/'+exercise[0].slug+'.md';
    var options = {url: url};
    request(options, function(err, resp, body) {
      $ = cheerio.load(body);
      var projects = $('.markdown-body p');
      var description = $(projects).text();
      res.render('problem', { user: req.user, exercise: exercise[0], exerciseBody:description });
    });
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
    Exercise.findOneAndUpdate({_id: req.query.id},
      {$push: {solutions: body.html_url}},
      {safe: true, upsert: true},
      function(err, model) {
        console.log(err);
      }
    );
    res.status(200).send({url:body.html_url});
  });

});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
}


module.exports = router;
