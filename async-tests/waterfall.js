/**
 * async waterfall test
 */

var async = require('async');
var request = require('request');

var progress = setInterval(function dotProgress() {
	process.stdout.write(".");
}, 1000);


function done(err, res, body) {
	if (err) {
		throw err;
	}
	clearInterval(progress);
	process.stdout.write('\n');
	console.log('2^8 = %d', body);
	
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

async.waterfall([
	function (next) {
		request.post({uri: 'http://localhost:8080', body:'2'}, next);
	}, 
	function (res, body, next) {
		request.post({uri: 'http://localhost:8080', body: body}, next);
    },
	function (res, body, next) {
		request.post({uri: 'http://localhost:8080', body: body}, next);
    }
], done);