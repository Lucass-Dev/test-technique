const winston = require('winston');
const colors = require('colors/safe');

const log_level_colors = {
    "log" : colors.bold.blue('LOG'),
    "info" : colors.bold.green('INFO'),
    "warn" : colors.bold.yellow('WARN'),
    "warning" : colors.bold.yellow('WARN'),
    "error" : colors.bold.red('ERROR'),
    "http" : colors.bold.cyan('HTTP'),
    "debug" : colors.bold.magenta('DEBUG'),

    "message" : (level, message) => {
        switch (level) {
            case 'info':
                return colors.green(message)
            case 'warning':
            case 'warn':
                return colors.yellow(message)
            case 'error':
                return colors.red(message)
            case 'debug':
                return colors.magenta(message)
            case 'notice':
                return colors.cyan(message)
            default:
                return colors.white(message);
        }
    }
}

const winston_logger = winston.createLogger({
    // levels: winston.config.syslog.levels,
    transports: [
        new winston.transports.Console({level: 'debug'}),
        // new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.label({
            label:'[LOGGER]'
        }),
        winston.format.json(),
        winston.format.timestamp({
           format: 'MMM-DD-YYYY HH:mm:ss'
       }),
        winston.format.printf(info => `${colors.bold.green(info.label)} [ ${log_level_colors[info.level]} ] [ ${[colors.bold(info.timestamp)]} ] - ${log_level_colors.message(info.level,info.message)}`),
    )
});


const logger = new class Logger {
    // log(message){
    //     winston_logger.info(message);
    // }
    log(message){
        winston_logger.info(message);
    }
    warn(message){
        winston_logger.warn(message)
        // winston_logger.log({
        //     level: ,
        //     message
        // });
        // winston_logger.warn(message);
    }
    error(message){
        winston_logger.error(message);
    }
    debug(message){
        winston_logger.log(
            'debug', 'Now my debug messages are written to console!'
        )
        winston_logger.debug(message);
    }
}

module.exports = logger