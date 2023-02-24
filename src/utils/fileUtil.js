import axios from 'axios'

export class FileUtil {
  static async getBufferFromUrlFile (url, headers, responseType = 'arraybuffer', encoding = 'utf-8') {
    try {
      const response = await axios.get(url, {
        headers,
        responseType
      })
      const buffer = response.data

      if (response.status === 200 && buffer) {
        return buffer
      }

      return null
    } catch (error) {
      return null
    }
  }
}
