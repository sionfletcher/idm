var SerialPort = require("serialport");

SerialPort.list(function(err, ports) {
	// console.log(ports);
	// ports.foreach(function(err, port) {
	// 	console.log(port);
	// });

	var port = new SerialPort("/COM3", {
	  baudRate: 57600
	});

	port.on('open', function() {
		console.log(arguments);
	});

	port.on('data', function (data) {
		console.log('Data: ' + data);
		// var b = new Buffer(data, 'hex')
		// var s = b.toString('utf8');

		// console.log(s);

		// for (var i = 0; i < 8; i++){
  //     		mySerial.write(get_readID[i]);
  //   	}
	});
});