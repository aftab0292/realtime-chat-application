// Internal Imports
const http = require('http');

//  External Imports
const express = require('express');
const socketio = require('socket.io');

// Initialize express framework
const app = express();
const server = http.createServer(app);

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
