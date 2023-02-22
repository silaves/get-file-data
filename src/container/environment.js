const {asValue} = require("awilix");
const dotenv = require("dotenv");

const envFound = dotenv.config();

if (envFound.error) {
  throw new Error ("Couldn't find .env file");
}

const {
  SERVER_PORT,
  LOG_LEVEL,
  API_PREFIX,
  NODE_ENV,
  HOST_APP_FILE_DATA,
  LIGHTSHIP_PORT,
} = process.env;

const registerEnvironment = (container) => {
  container.register({
    appConfig: asValue({
      serverPort: parseInt(SERVER_PORT),
      logLevel: LOG_LEVEL,
      apiPrefix: API_PREFIX,
      nodeEnv: NODE_ENV,
      hostAppFileData: HOST_APP_FILE_DATA,
      lightshipConfiguration: {
        port: parseInt(LIGHTSHIP_PORT),
        detectKubernetes: false,
      }
    }),
  });
}

module.exports = {registerEnvironment};