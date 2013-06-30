/**
 * async collection filter test
 */

var async = require('async');
var request = require('request');

var collection = [1, 2, 3, 4, 5];
var progress = setInterval(function dotProgress() {
	process.stdout.write(".");
}, 1000);



function done(results) {
	clearInterval(progress);
	process.stdout.write("\n");
	console.log('These are the elements of %j whose square value is greater ' +
			'than 10: %j', collection, results);
}

function test(value) {
	return value > 10;
}

function filter(item, callback) {
	request.post({
		uri: 'http://localhost:8080',
		body: JSON.stringify(item)
	},
	function (err, res, body) {
		if (err) {
			throw err;
		}
		callback(body && test(JSON.parse(body)));
	});
}

async.filter(collection, filter, done);
