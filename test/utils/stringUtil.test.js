import {StringUtil} from "../../src/utils/stringUtil.js";
import chai from "chai";

let expect = chai.expect;

describe('StringUtil', function() {

  context('validaObjectJson', function() {
    it('should be valid JSON', function() {
      // given
      const jsonResponse = [
        {
          "file": "test2.csv",
          "text": "KCwzt",
          "number": "",
          "hex": ""
        }
      ]

      // when
      const result = StringUtil.validaObjectJson(JSON.stringify(jsonResponse))

      // then
      expect(result).to.equal(true)
    })

    it('should be invalid JSON', function() {
      // given
      const jsonResponse = null

      // when
      const result = StringUtil.validaObjectJson(jsonResponse)

      // then
      expect(result).to.equal(true)
    })

    it('should be valid JSON string', function() {
      // given
      const jsonResponse =
        `[
        {
          "file": "test2.csv",
          "text": "KCwzt",
          "number": "",
          "hex": ""
        }
      ]`

      // when
      const result = StringUtil.validaObjectJson(jsonResponse)

      // then
      expect(result).to.equal(true)
    })

    it('should be invalid JSON string', function() {
      // given
      const jsonResponse =
        `
          "file": "test2.csv",
          "text": "KCwzt",
          "number": "",
          "hex": ""
        }
      ]`

      // when
      const result = StringUtil.validaObjectJson(jsonResponse)

      // then
      expect(result).to.equal(false)
    })
  })

  context('getValueWithFormat', function() {
    it('should be return boolean type - true', function() {
      // given
      const value = "true"

      // when
      const result = StringUtil.getValueWithFormat(value)

      // then
      expect(result).to.equal(true)
    })

    it('should be return boolean type - false', function() {
      // given
      const value = "false"

      // when
      const result = StringUtil.getValueWithFormat(value)

      // then
      expect(result).to.equal(false)
    })

    it('should be return string type', function() {
      // given
      const value = "True"

      // when
      const result = StringUtil.getValueWithFormat(value)

      // then
      expect(result).to.equal("True")
    })

    it('should be return empty String', function() {
      // given
      const value = null

      // when
      const result = StringUtil.getValueWithFormat(value)

      // then
      expect(result).to.equal("")
    })

    it('should be return String', function() {
      // given
      const value = "gatomon"

      // when
      const result = StringUtil.getValueWithFormat(value)

      // then
      expect(result).to.equal("gatomon")
    })

    it('should be return Number type - integer', function() {
      // given
      const value = "12345"

      // when
      const result = StringUtil.getValueWithFormat(value)

      // then
      expect(result).to.equal(12345)
    })

    it('should be return Number type - flotante', function() {
      // given
      const value = "12345.12"

      // when
      const result = StringUtil.getValueWithFormat(value)

      // then
      expect(result).to.equal(12345.12)
    })
  })
})
