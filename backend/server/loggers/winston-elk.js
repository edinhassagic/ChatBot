'use strict';

const winston = require('winston');
const { ecsFormat } = require('@elastic/ecs-winston-format');

const packageJson = require('#root/package.json');

const logger = winston.createLogger({
    // format: ecsFormat({ serviceName: packageJson.name }),
    transports: [
        new winston.transports.Console()
    ]
});

module.exports = logger