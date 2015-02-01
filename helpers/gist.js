var request = require('request');

var url = 'https://api.github.com/gists/ca266f402a7a90a2e785';
var options = {
  method: 'get',
  json: true,
  url: url,
  headers : {
    'User-Agent': 'test'
  }
};


var test = function createGist () {

  request(options, function (err, res, body) {
    if (err) {
      inspect(err, 'error posting json');
      return;
    }
    var headers = res.headers;
    var statusCode = res.statusCode;
    console.log(body);
  });

};


module.exports = test;