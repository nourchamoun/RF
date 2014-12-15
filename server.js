var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// var http = require('http');


var SerialPort = require("serialport").SerialPort
var serialPort = new SerialPort("/dev/tty.usbserial-DC008P3L", {
    baudrate: 57600
});

var sendData = false;

app.use(express.static(__dirname + "/language-guide"));



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
        console.log("parseddata: " + parsedData);

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
            "lastSensor01": parsedData[0],
            "lastSensor02": parsedData[1],
            "lastSensor03": parsedData[2],
            "lastSensor04": parsedData[3],
            "lastSensor05": parsedData[4]
            // "lastSensor06": parsedData[5]

        })

    });

});

server.listen(8081);
