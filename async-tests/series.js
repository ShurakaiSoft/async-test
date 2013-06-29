/**
 * Async series test file
 */


var async = require('async');
var request = require('request');

var progress = setInterval(function dotProgress() {
	process.stdout.write(".");
}, 1000);


function done(err, results) {
	if (err) {
		throw err;
	}
	clearInterval(progress);
	process.stdout.write('\n');
	console.log('results: %j', results);
	
}

function sendRequest(body) {
	return function (next) {
		var post = {
			uri: 'http://localhost:8080', 
			body: body
		};
		request.post(post, function (err, res, body) {
			next(err, body && JSON.parse(body));
		});
	};
}

async.series([
                sendRequest('4'),
                sendRequest('5'),
                sendRequest('8')
                ], done);

