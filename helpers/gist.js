var request = require('request');

var postData = {
    description: 'test',
    public: false,
    files: {"test.txt":{"content":"String file contents"}}
};
var url = 'https://api.github.com/gists';
var options = {
  method: 'post',
  body: postData,
  json: true,
  url: url
};

request(options, function (err, res, body) {
  if (err) {
    inspect(err, 'error posting json');
    return;
  }
  var headers = res.headers;
  var statusCode = res.statusCode;
  console.log(body);
});

var test = "hi from a module!";

module.exports = test;