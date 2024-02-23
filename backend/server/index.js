const path = require("path");
const v8 = require("v8");

require("dotenv").config({ path: path.resolve(__dirname, "../", ".env") });

const {
  startServer: startSocketServer,
  closeServer: closeSocketServer,
} = require("#servers/socketIo.js");

const { terminateProcess, exitHandler } = require("#utils/index.js");
const logger = require("#loggers/winston-elk.js");

const HOST_SOCKET = process.env.EXPRESS_SOCKET_HOST;
const PORT_SOCKET = process.env.EXPRESS_SOCKET_PORT;

const exitCleanup = async () => {
  logger.info("Resource cleanup");

  const servicesPromises = [closeSocketServer()];

  await Promise.allSettled(servicesPromises)
    .then(() => {
      logger.info("All services stopped");
    })
    .catch(async (error) => {
      logger.error("Services failed to stop");
      console.log(error);
      logger.error(error);
    });
};

const initiateServerStartSequence = async () => {
  const heapStatistics = v8.getHeapStatistics();
  const heapSizeLimit = heapStatistics.heap_size_limit;

  logger.info(
    `Current allowed heap size limit: ${heapSizeLimit / (1024 * 1024)} MB`
  );

  logger.info("Initiating server startup sequence");

  await startSocketServer(HOST_SOCKET, PORT_SOCKET)
    .then(async () => {
      logger.info(`Io server is ready`);
    })
    .then(() => {
      logger.info(`Attaching io server events`);
      require("#socketIo/index.js");
      logger.info(`Io server events attached`);
    })
    .then(() => {
      logger.info(`Server startup sequence successfully completed`);
    })
    .catch(async (error) => {
      logger.error("Failed to initialize server");
      terminateProcess(0, "startupFailed", exitCleanup)(error);
    });
};

exitHandler(exitCleanup);

initiateServerStartSequence();
