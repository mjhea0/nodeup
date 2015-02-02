var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    Exercise = require('../models/exercises.js'),
    request = require('request');
    cheerio = require('cheerio');


router.get('/', function(req, res) {
  if (req.user) {
    Exercise.find({}, function(err, exercises) {
      res.render('index', { user: req.user, exercises: exercises});
    });
  } else {
    res.render('index', { user: req.user });
  }
});


module.exports = router;
