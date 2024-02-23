const http = require("http");
const { Server } = require('socket.io');
const express = require('express')

const { EXPRESS_ERROR } = require("#data/enums/express.js");
const logger = require("#loggers/winston-elk.js");

const app = express()

require('#loggers/morgan-elk.js')(app)

const server = http.createServer(app);

const io = new Server(server, { transports: ['websocket'], cors: { origin: '*' } });

const startServer = async (host, port) => new Promise((resolve) => {

    logger.info('Io Express: starting')

    server.listen(port, host, () => {
        logger.info(`Io Express: started at ${host}:${port}`); resolve()
    })
});

const closeServer = () => new Promise((resolve, reject) => {

    try { server.removeAllListeners('listening') }
    catch (error) {
        logger.error('Io Express: failed to clear listeners')
        logger.error(error)
    }

    server.close((error) => {
        if (error && error.message !== EXPRESS_ERROR.SERVER_NOT_RUNNING) {
            logger.error('Io Express: failed to close')
            reject(error)
        }
        else {
            logger.info('Io Express: closed')
            resolve()
        }
    })
}
)

const handleErrors = async (error) => {

    if (error.code === EXPRESS_ERROR.EADDRINUSE) {
        logger.error('Io Express: address in use');
        throw (error)
    }
    if (error.code === EXPRESS_ERROR.EADDRNOTAVAIL) {
        logger.error('Io Express: address not available');
        throw (error)
    }
    if (error.code === EXPRESS_ERROR.ENOTFOUND) {
        logger.error('Io Express: address not correct');
        throw (error)
    }
    else logger.error(error)

}

server.on('error', handleErrors);

module.exports = { server, io, startServer, closeServer, handleErrors }