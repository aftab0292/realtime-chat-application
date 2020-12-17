// Internal Imports
const path = require('path');

// External Imports
const bodyParser = require('body-parser');

// Custom Imports
// const config = require('../configurations');

module.exports = (app, express, root) => {
  
    // Serve static directory
    app.use(express.static(path.join(__dirname, '../../public')));

  // Enable request body parsing
  app.use(
    bodyParser.urlencoded({
      extended: true,
      // limit: config.get('server.bodyParser.limit'),
    })
  );
}