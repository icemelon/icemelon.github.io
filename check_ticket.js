function process(data, socket) {
	var lines = data.split('\r\n');
	var tickets = new Object();
	for (var i = 0; i < lines.length; i++) {
		var line = lines[i];
		if (line.indexOf('Universal Orlando') > 0) {
			var info = lines[i - 3];
			var avail = true;
			if (info.indexOf('Not Available') > 0)
				avail = false;
			if (line.indexOf('1-Day') > 0) {
				tickets['universal1'] = avail;
				//console.log('Universal Orlando [1-Day]\t' + (avail ? 'Available' : 'Not Available'));
			} else {
				tickets['universal2'] = avail;
				//console.log('Universal Orlando [2-Day]\t' + (avail ? 'Available' : 'Not Available'));
			}
		} else if (line.indexOf('Disney') > 0) {
			var info = lines[i - 3];
			var avail = true;
			if (info.indexOf('Not Available') > 0)
				avail = false;
			tickets['disney'] = avail;
			//console.log('Disney Theme Parks\t' + (avail ? 'Available' : 'Not Available'));
		} else if (line.indexOf('Sea World') > 0) {
			var info = lines[i - 3];
			var avail = true;
			if (info.indexOf('Not Available') > 0)
				avail = false;
			tickets['seaworld'] = avail;
			//console.log('Sea World\t' + (avail ? 'Available' : 'Not Available'));
		}
	}
	
	socket.send(JSON.stringify(tickets));
}

function refresh(socket) {

	var options = {
	  host: 'asf.sdes.ucf.edu',
	  port: 80,
	  path: '/ticket-center/current-prices'
	};

	var http = require('http');
	var req = http.get(options, function(res) {

		var data = '';

		res.on('data', function(chunk) {
			//console.log(typeof chunk);
			data += chunk;
			//console.log(content);
			/*lines = content.split('\n');
			console.log(lines[0]);*/
			//console.log('body: ' + chunk);
		});

		res.on('end', function() {
			return process(data, socket);
		})
		
		res.on('error', function(e) {
			console.log('Got error: ' + e.message);
		});
	});
}

//refresh();

var app = require('express').createServer();
app.listen(8000);
console.log('listen port 8000');
var webRTC = require('webrtc.io').listen(app);
var rtc = webRTC.rtc;

rtc.on("connect", function(rtc) {
	console.log('client connected');
});

rtc.on('refresh', function(data, socket) {
	console.log('start to refresh');
	refresh(socket);
});