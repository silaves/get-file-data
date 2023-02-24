export class StringUtil {
  static validaObjectJson (jsonData) {
    try {
      JSON.parse(jsonData)
      return true
    } catch (e) {
      return false
    }
  }

  static validContent (fields) {
    if (fields.length > 0) {
      for (let i = 0; i < fields.length; i++) {
        if (fields[i]) {
          return true
        }
      }
    }

    return false
  }

  static getValueWithFormat (value) {
    if (value === undefined || value === '' || value === null) {
      return ''
    }

    if (!isNaN(value)) {
      return Number(value)
    }

    if (value === 'true' || value === 'false') {
      return JSON.parse(value.toLowerCase())
    }

    return String(value)
  }
}
