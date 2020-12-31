// Internal Imports
const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
//  External Imports
const express = require('express');
const socketio = require('socket.io');

// Initialize express framework
const app = express();

let server;

if (process.env.NODE_ENV === "production") {
    const options = {
        key: fs.readFileSync(path.join(__dirname, `YOUR_KEY_FILE_PATH`)),
        cert: fs.readFileSync(path.join(__dirname, `YOUR_CERTIFICATE_FILE_PATH`))
    };
    // Create https server
    server = https.createServer(options, app);
} else {
    // Create http server
    server = http.createServer(app);
}

// Initialize socket
const io = socketio(server);
require('./sockets')(io);

// Set base testing routes
app.get('/', (req, res) => {
  res.json({
    name: 'node-socket',
    environment: process.env.NODE_ENV,
    port: process.env.PORT,
  });
});

module.exports = server;
