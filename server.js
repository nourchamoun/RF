var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var SerialPort = require("serialport").SerialPort
var serialPort = new SerialPort("/dev/tty.usbserial-DN008PNB", {
    baudrate: 57600
});

var sendData = false;

app.use(express.static(__dirname + "/frontend"));



io.on('connection', function(socket) {

    sendData = true;

});

serialPort.on("open", function() {
    console.log('open');
    serialPort.on('data', function(data) {

        if (!sendData) {
            return
        };

        var raw = "" + data;
        var parsedData = raw.split("");
    

        for (var i = 0; i < parsedData.length; i++) {
            if (parsedData[i] == 0) {
                parsedData[i] = false;
            } else if (parsedData[i] == 1) {
                parsedData[i] = true;
            } else {
                parsedData[i] = false;
            }
        };

        io.emit('sensordata', {
            "sensor01": parsedData[0],
            "sensor02": parsedData[1],
            "sensor03": parsedData[2],
            "sensor04": parsedData[3],
            "sensor05": parsedData[4],
            "sensor06": parsedData[5]

        })

    });

});

server.listen(8081);
