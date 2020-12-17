// Internal Imports
const util = require('util');

// Uncaught exception listener
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION!, Shutting down...');
  console.error(err.name, err.message);
  console.error(util.format(`Error: %O`, err));
  process.exit(1);
});

// Bootstrap express application
const app = require('./src/app');

const PORT = process.env.PORT || 3007;
const ENVIRONMENT = process.env.NODE_ENV || 'Development';

// Start server
const server = app.listen(PORT, () => {
  console.info(
    `Express server listening on PORT: ${PORT} with PROCESSID: ${
    process.pid
    }`
  );
  console.info(`Environment: ${ENVIRONMENT}`);
});

// unhandle rejection listener
process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION!, Shutting down...');
  console.error(util.format(`Error: %O`, err));
  server.close(() => {
    process.exit(1);
  });
});

/**
 * Catch kill signals and stop gracefully
 * Cleanup code goes here
 */
const shutdown = () => {
  console.debug('Shutting down gracefully');
  server.close(() => {
    console.debug('Process terminated!');
  });
};

// When process is terminated
process.on('SIGTERM', shutdown).on('SIGINT', shutdown).on('SIGUP', shutdown);
