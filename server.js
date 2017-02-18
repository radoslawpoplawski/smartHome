'use strict';

var Gpio = require('onoff').Gpio,
    led = {
        red: new Gpio(15, 'low'),
        yellow: new Gpio(27, 'low'),
        green: new Gpio(10, 'low')
    },
    button = new Gpio(3, 'in', 'both');

var WebSocketServer = require('websocket').server;
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var wsServer;
var connection;
var connections = [];
var app = express();



app.use(express['static'](__dirname));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.post('/login-do', function(req, res) {
    if (req.body.login && req.body.password) {
        if (req.body.login === 'admin' && req.body.password === 'admin') {
            res.status(200).send(JSON.stringify({data: {user: 'admin', error: null}, status: {code: 200}}));
        } else {
            res.status(200).send(JSON.stringify({data: {error: 'Błędny login lub hasło'}, status: {code: 410}}));
        }
    } else {
        res.status(200).send(JSON.stringify({data: {error: 'Błąd przy próbie logowania'}, status: {code: 410}}));
    }
});

app.get('/led/:colour/:value', function(req, res) {
  if (led[req.params.colour]) {
     if (req.params.value == 1 || req.params.value == 0) {
       if (req.params.value != led[req.params.colour].readSync()) {
         led[req.params.colour].writeSync(parseFloat(req.params.value));
         res.status(200).send(JSON.stringify({data: {led: '1'}, status: {code: 200}}));
         sendValues();
       } else {
         res.status(200).send('Led ' + req.params.colour + ' value ' + req.params.value + 'already  set');
       }
     } else {
       res.status(200).send('Value ' + req.params.value + ' can\'t be set');
     }
  } else {
     res.status(200).send('Led ' + req.params.colour + ' doesn\'t initialized');
  }
  
}); 

app.get('/button', function(req, res) {
  toggleLeds();
  res.status(200).send('All leds value set to ' + led.red.readSync());
});

// Express route for any other unrecognised incoming requests
app.get('*', function(req, res) {
  res.status(404).send('Unrecognised API call');
});

// Express route to handle errors
app.use(function(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send('Oops, Something went wrong!');
  } else {
    next(err);
  }
});

app.listen(3000);
console.log('App Server running at port 3000');



button.watch(function (err, value) {
  if (value === 0) {
    toggleLeds();
  }
});

function sendValues() {
    for(var i = 0; i < connections.length; i++) {
        connections[i].sendUTF(JSON.stringify({
            led: {
                red: {value: led.red.readSync()},
                yellow: {value: led.yellow.readSync()},
                green: {value: led.green.readSync()}
            }
        }));
    }
}

function toggleLeds() {
  if (led.red.readSync() == 0 && led.yellow.readSync() == 0 && led.green.readSync() == 0) {
    led.red.writeSync(1);
    led.yellow.writeSync(1);
    led.green.writeSync(1);
  } else {
    led.red.writeSync(0);
    led.yellow.writeSync(0);
    led.green.writeSync(0);
  }
  sendValues();
}

var server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});
server.listen(8080, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});

wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});

wsServer.on('request', function(request) { 
    connection = request.accept('echo-protocol', request.origin);

    connections.push(connection);

    console.log((new Date()) + ' Connection accepted.');

    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log('Received Message: ' + message.utf8Data);
            connection.sendUTF(message.utf8Data);
        }
        else if (message.type === 'binary') {
            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            connection.sendBytes(message.binaryData);
        }
    });

    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});

process.on('SIGINT', function () {
  led['red'].unexport();
  led['yellow'].unexport();
  led['green'].unexport();
  button.unexport();
});
