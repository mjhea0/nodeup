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

// var Gisty = require('gisty');

// var gist = new Gisty({
//   username: 'meritt'
// });

// gist.fetch('1111422', function(error, gist) {
//   if (error) {
//     throw new Error(error);
//   }

//   for (filename in gist.files) {
//     console.log(filename + "\n" + gist.files[filename].content + "\n\n");
//   }
// });