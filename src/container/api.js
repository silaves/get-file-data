const {asFunction} = require("awilix");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const { GetFileController } = require("../api/controllers/getFile");
const {requestLogger, errorLogger} = require("../api/middleware/requestLogger");
const {handleError, handleError404} = require("../api/middleware/handleError");

function registerRestApi(container) {
  container.register({
    getFileController: asFunction(() => {
      return new GetFileController();
    }),
    router: asFunction(({getFileController}) => {
      const router = express.Router();
      router.use(express.json());
      router.get(
        '/files/data',
        getFileController.getFileData.bind(getFileController),
      );
      router.get(
        '/files/list',
        getFileController.getFileList.bind(getFileController),
      );
      return router;
    }),
    express: asFunction(({router, appConfig}) => {
      const app = express();
      app.use(helmet());
      app.use(cors({
        origin: appConfig.hostAppFileData,
      }));
      app.use(requestLogger);
      app.use(errorLogger);
      app.use(appConfig.apiPrefix, router);
      app.use(handleError404);
      app.use(handleError);

      return app;
    }),
  });
}

module.exports = {registerRestApi};
