"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildLoger = void 0;
const winston = require('winston');
const { combine, json, timestamp } = winston.format;
const customlog = winston.createLogger({
    level: 'info',
    format: combine(json(), timestamp()),
    //format: winston.format.json(), eliminamos y personalizamos
    // defaultMeta: { service: ' monitoreo de service' },
    transports: [
        //
        // - Write all logs with importance level of `error` or higher to `error.log`
        //   (i.e., error, fatal, but not other levels)
        //
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        //
        // - Write all logs with importance level of `info` or higher to `combined.log`
        //   (i.e., fatal, error, warn, and info, but not trace)
        //
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});
// module.export = function builderloger(x){}
const buildLoger = (service) => {
    return {
        log: (mensaje) => {
            customlog.log('info', {
                mensaje,
                service,
                at: Date().toString()
            });
        },
        error: (mensaje) => {
            customlog.log('error', {
                mensaje,
                service,
                at: Date().toString()
            });
        }
    };
};
exports.buildLoger = buildLoger;
