import { logger } from '../../logger/index.js'
import { StringUtil } from '../../utils/stringUtil.js'

export class GetFileController {
  constructor ({ secretFileService }) {
    this.secretFileService = secretFileService
  }

  async getFileData (req, res) {
    const files = await this.secretFileService.getSecretFilesList()

    if (!files) {
      logger.error('Error getting the list of files')
      res.status(500).json({
        message: 'Internal server error'
      })
    }
    const jsonFileList = []

    for (let i = 0; i < files.files.length; i++) {
      const jsonFile = await this.secretFileService.getSecretFile(files.files[i])

      if (!StringUtil.validaObjectJson(jsonFile)) {
        jsonFileList.push(jsonFile)
      }
    }
    res.status(200).json(jsonFileList)
  }

  async getFileList (req, res) {
    const fileName = req.query.fileName
    let jsonResponse = null

    if (fileName) {
      jsonResponse = await this.secretFileService.getSecretFile(fileName)
    } else {
      jsonResponse = await this.secretFileService.getSecretFilesList()
    }

    if (StringUtil.validaObjectJson(jsonResponse)) {
      logger.error('Not found file or list')
      return res.status(404).json({
        message: 'Not found'
      })
    }

    return res.status(200).json(jsonResponse)
  }
}
