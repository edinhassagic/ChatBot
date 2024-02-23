/**
 * @readonly
 * @enum {string}
 */
module.exports.NODE_ENV = {
    PRODUCTION: 'production',
    DEVELOPMENT: 'development'
}

/**
 * @readonly
 * @enum {string}
 */
module.exports.PROCESS_EXIT_SIGNAL = {
    UNCAUGHT_EXCEPTION: 'uncaughtException',
    UNHANDLED_REJECTION: 'unhandledRejection',
    SIGTERM: 'SIGTERM',
    SIGINT: 'SIGINT',
}