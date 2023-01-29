"use strict";
exports.__esModule = true;
exports.logger = void 0;
var winston = require('winston');
exports.logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `console`
        //
        new winston.transports.File({ filename: '../Logger/error.log', level: 'error' }),
        new winston.transports.Console()
    ]
});
