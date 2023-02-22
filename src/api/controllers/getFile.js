const {logger} = require("../../logger");

class GetFileController {

  constructor() {
  }

  async getFileData (req, res) {
    logger.info(`Getting file data`);
    res.status(200).json({
      message: "GetFileData"
    });
  }

  async getFileList (req, res) {
    logger.info(`Getting file list`);
    res.status(200).json({
      message: "GetFileList"
    });
  }
}

module.exports = {GetFileController};