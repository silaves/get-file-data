const {createHttpTerminator} = require("http-terminator");
const {createLightship} = require("lightship");
const {configureContainer} = require("./container");
const {logger} = require("./logger");

const container = configureContainer();
const expressApp = container.cradle.express;
const httpPort = container.cradle.appConfig.serverPort;
const nodeEnv = container.cradle.appConfig.nodeEnv;

const lightship = createLightship(container.cradle.appConfig.lightshipConfiguration);
lightship.signalReady();
logger.info(`Linghtship on port '${container.cradle.appConfig.lightshipConfiguration.port}' in '${nodeEnv}' configuration`);

const expressServer = expressApp.listen(httpPort, () => {
  logger.info(`Server starting on port '${httpPort}' in '${nodeEnv}' configuration`);
});

const httpTerminator = createHttpTerminator({server: expressServer});
lightship.registerShutdownHandler(async () => {
  await httpTerminator.terminate();
  logger.info('Server successfully stopped');
});