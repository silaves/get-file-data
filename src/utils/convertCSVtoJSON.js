import { FileUtil } from './fileUtil.js'
import { StringUtil } from './stringUtil.js'

const delimiterLine = /\r?\n/
const delimiterColumn = ','
const encoding = 'utf-8'

export class ConvertCSVtoJSON {
  convertCSVtoStr (fileName) {
    return FileUtil.readFile(fileName, encoding)
  }

  static CSVtoJSON (csvStr) {
    const jsonResult = []
    const lines = csvStr.split(delimiterLine)
    const headers = lines[0].split(delimiterColumn)

    for (let i = 1; i < lines.length; i++) {
      if (StringUtil.validContent(lines[i])) {
        const jsonObject = {}
        const valueFields = lines[i].split(delimiterColumn)

        for (let k = 0; k < headers.length; k++) {
          jsonObject[headers[k]] = StringUtil.getValueWithFormat(valueFields[k])
        }

        jsonResult.push(jsonObject)
      }
    }

    return jsonResult
  }

  static customJSONFormat (jsonArray) {
    const mainName = 'file'
    const jsonObject = {}
    const lines = []

    if (!jsonArray || jsonArray.length <= 0) {
      return jsonObject;
    }
    jsonObject.file = jsonArray[0].file

    for (let i = 0; i < jsonArray.length; i++) {
      const data = jsonArray[i]
      delete data[mainName]
      lines.push(data)
    }

    jsonObject.lines = lines
    return jsonObject
  }
}
