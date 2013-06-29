/**
 * Squaring Server
 */


var http = require('http');

var port = process.argv[2] && parseInt(process.argv[2], 10) || 8080;

http.createServer(function (req, res) {
	var body = '';
	
	req.setEncoding('utf8');
	req.on('data', function (data) {
		body += data;
	});
	req.once('end', function () {
		var number = JSON.parse(body);
		var squared = Math.pow(number, 2);
		setTimeout(function simulateLongComputeTime() {
			res.end(JSON.stringify(squared));
		}, 3000);
	});
}).listen(port, function () {
	console.log('Squaring server listening on port: %d', port);
});

