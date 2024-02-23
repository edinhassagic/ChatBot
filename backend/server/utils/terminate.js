const { PROCESS_EXIT_SIGNAL } = require('#data/enums/node.js')
const logger = require('#loggers/winston-elk.js')

const terminateProcess = (code = 0, signal = '', exitCleanup) => {

    const coreDump = false
    const timeout = 2000

    const exit = () => { coreDump ? process.abort() : process.exit(code) }

    return async (error) => {

        logger.warn(`Terminating process with code ${code} and signal ${signal}`)

        switch (signal) {
            case PROCESS_EXIT_SIGNAL.UNCAUGHT_EXCEPTION:
            case PROCESS_EXIT_SIGNAL.UNHANDLED_REJECTION: logger.error(error); break;
            case PROCESS_EXIT_SIGNAL.SIGTERM:
            case PROCESS_EXIT_SIGNAL.SIGINT: break;
            default: logger.error(error); break;
        }

        if (exitCleanup) await exitCleanup()

        setTimeout(() => exit(code, signal), timeout).unref()
    }
}

const exitHandler = (exitCleanup) => {

    process.on(PROCESS_EXIT_SIGNAL.UNCAUGHT_EXCEPTION, terminateProcess(1, PROCESS_EXIT_SIGNAL.UNCAUGHT_EXCEPTION, exitCleanup));
    process.on(PROCESS_EXIT_SIGNAL.UNHANDLED_REJECTION, terminateProcess(1, PROCESS_EXIT_SIGNAL.UNHANDLED_REJECTION, exitCleanup));
    process.on(PROCESS_EXIT_SIGNAL.SIGTERM, terminateProcess(0, PROCESS_EXIT_SIGNAL.SIGTERM, exitCleanup));
    process.on(PROCESS_EXIT_SIGNAL.SIGINT, terminateProcess(0, PROCESS_EXIT_SIGNAL.SIGINT, exitCleanup));
}

module.exports = { terminateProcess, exitHandler }