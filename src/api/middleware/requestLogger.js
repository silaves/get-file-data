const expressWinston = require('express-winston');
const {logger} = require("../../logger");

const requestLogger = expressWinston.logger({
  winstonInstance: logger,
});

const errorLogger = expressWinston.errorLogger({
  winstonInstance: logger,
});

module.exports = {requestLogger, errorLogger};