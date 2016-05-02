var querystring = require('querystring');
var http = require('http');
var fs = require('fs');
var request = require('request');





function PostCode(codestring) {
  // Build the post string from an object
  var post_data = JSON.stringify({
    "Ghiradelli": 2
  });

  // An object of options to indicate where to post to
  var post_options = {
      host: 'http://ec2-50-16-165-69.compute-1.amazonaws.com',
      port: '8080',
      path: '/customers/sandhya@gmail/cart',
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(post_data)
      }
  };

  // Set up the request
  var post_req = http.request(post_options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
          console.log('Response: ' + chunk);
      });
  });

  // post the data
  post_req.write(post_data);
  post_req.end();

}

var data = {"foo": 2}
PutCode(data);
