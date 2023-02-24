import { FileUtil } from '../utils/fileUtil.js'
import { ConvertCSVtoJSON } from '../utils/convertCSVtoJSON.js'

export class SecretFileService {
  constructor ({ appConfig, secretFileConnection }) {
    this.secretFileSConfig = appConfig.secretFile
    this.secretFileConnection = secretFileConnection
  }

  async getSecretFilesList () {
    try {
      const response = await this.secretFileConnection({
        url: this.secretFileSConfig.apiFilesList,
        method: 'GET'
      })

      if (response.status !== 200) {
        return null
      }

      return response.data
    } catch (error) {
      return null
    }
  }

  async getSecretFile (fileName) {
    try {
      const bufferCSV = await FileUtil.getBufferFromUrlFile(
        `${this.secretFileSConfig.host}${this.secretFileSConfig.apiFile}/${fileName}`,
        {
          Authorization: `${this.secretFileSConfig.typeAuth} ${this.secretFileSConfig.token}`,
          'Content-Type': 'application/json'
        },
        'arraybuffer'
      )

      if (!bufferCSV) {
        return null
      }

      const jsonResult = ConvertCSVtoJSON.CSVtoJSON(bufferCSV.toString())
      if (jsonResult && jsonResult.length > 0) {
        return ConvertCSVtoJSON.customJSONFormat(jsonResult)
      }
      return null
    } catch (error) {
      return null
    }
  }
}
