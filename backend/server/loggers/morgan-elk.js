'use strict';

const morgan = require("morgan");
const { ecsFormat } = require('@elastic/ecs-morgan-format');

const packageJson = require('#root/package.json');

module.exports = function (app) {

    app.use(morgan(ecsFormat({ serviceName: packageJson.name })));

};
