const { v4: uuidv4 } = require('uuid');

const logger = require('#loggers/winston-elk.js');


const logErrorWithId = ({ message, error }) => {

    const uuid = uuidv4()

    if (message) logger.error(`Error [${uuid}]: ${message}`)
    if (error) logger.error(error)

    return uuid
}


module.exports = { logErrorWithId }