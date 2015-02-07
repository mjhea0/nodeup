var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    request = require('request'),
    cheerio = require('cheerio'),
    User = require('../models/users.js'),
    stripeKeys = require('../config/_config.js'),
    stripe = require('stripe')(stripeKeys.secretKey);


router.get('/charge', ensureAuthenticated, function(req, res){
  res.render('charge', { user: req.user });
});

router.post('/stripe', ensureAuthenticated, function(req,res) {
  // obtain StripeToken
  var transaction = req.body;
  var stripeToken = transaction.stripeToken;
  // save stripeToken in user model
  User.findOneAndUpdate({_id: mongoID},
    {$push: {solutions: body.html_url}},
    {safe: true},
    function(err, model) {
      console.log(err);
    }
  );
  // create charge
  var charge = {
    amount: 10*100,
    currency: 'USD',
    card: stripeToken
  };
  stripe.charges.create(charge, function(err, charge) {
    if(err) {
      console.log(err);
    } else {
      res.json(charge);
      console.log('Successful charge sent to Stripe!');
    }
  });
  // render congrats page
  res.render('congrats', { title: "Congrats!", charge: charge.amount/100.00});
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
}

module.exports = router;