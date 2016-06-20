var winston = require('winston'),
	path = require('path'),
	argPath = process.argv[2] === '--logpath' ? process.argv[3] : '../debug.log';
	filePath = path.join(__dirname, argPath),
	logger = new (winston.Logger)({
	  transports: [
	    new (winston.transports.Console)({ json: false, timestamp: true }),
	    new winston.transports.File({ filename: filePath, json: false })
	  ],
	  exceptionHandlers: [
	    new (winston.transports.Console)({ json: false, timestamp: true }),
	    new winston.transports.File({ filename: filePath, json: false })
	  ],
	  exitOnError: false
	});
module.exports = logger;