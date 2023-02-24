import {ConvertCSVtoJSON} from "../../src/utils/convertCSVtoJSON.js";
import chai from "chai";

let expect = chai.expect;

describe('CSVtoJSON()', function() {

  context('valid CSV', function() {
    it('should be equals', function() {
      // given
      const csvStr =
        `file,text,number,hex
test2.csv,KCwzt
test2.csv,tgteXhEfBnPAaHaoUxhAYrmX,96,7cca49c4694ca0ad528ba82f4c9400e7`
      const jsonResponse = [
        {
          "file": "test2.csv",
          "text": "KCwzt",
          "number": "",
          "hex": ""
        },
        {
          "file": "test2.csv",
          "text": "tgteXhEfBnPAaHaoUxhAYrmX",
          "number": 96,
          "hex": "7cca49c4694ca0ad528ba82f4c9400e7"
        }
      ]

      // when
      const result = ConvertCSVtoJSON.CSVtoJSON(csvStr)

      // then
      expect(result.length).to.equal(jsonResponse.length)
      expect(JSON.stringify(result)).to.equal(JSON.stringify(jsonResponse))
    })

    it('should be return valid CSV without error lines', function() {
      // given
      const csvStr =
        `file,text,number,hex

test2.csv,tgteXhEfBnPAaHaoUxhAYrmX,96,7cca49c4694ca0ad528ba82f4c9400e7`
      const jsonResponse = [
        {
          "file": "test2.csv",
          "text": "tgteXhEfBnPAaHaoUxhAYrmX",
          "number": 96,
          "hex": "7cca49c4694ca0ad528ba82f4c9400e7"
        }
      ]

      // when
      const result = ConvertCSVtoJSON.CSVtoJSON(csvStr)

      // then
      expect(result.length).to.equal(jsonResponse.length)
      expect(JSON.stringify(result)).to.equal(JSON.stringify(jsonResponse))
    })

    it('should be return valid CSV with mixin formats', function() {
      // given
      const csvStr =
        `file,text,number,hex,status
test18.csv,vnaTwFwNVVLjVJjutX,478,jz9783f2e9029a1add828699068a89,true
test18.csv,YPrJiwMbZzsLCImqXEzoetU,7267800450,jzcc0e80704170f399179bfae95b02,true
test18.csv,I,858952,jzdf7ba615a115f2eff0fb6a549aef,true
test18.csv,OWCtTW,000144135,jz216e4c907997a4f3879b00426861,true
test18.csv,yOHQVf,5020,jz88ac396497d2a10874297b94478b,false`
      const jsonResponse = [
        {
          "file": "test18.csv",
          "text": "vnaTwFwNVVLjVJjutX",
          "number": 478,
          "hex": "jz9783f2e9029a1add828699068a89",
          "status": true
        },
        {
          "file": "test18.csv",
          "text": "YPrJiwMbZzsLCImqXEzoetU",
          "number": 7267800450,
          "hex": "jzcc0e80704170f399179bfae95b02",
          "status": true
        },
        {
          "file": "test18.csv",
          "text": "I",
          "number": 858952,
          "hex": "jzdf7ba615a115f2eff0fb6a549aef",
          "status": true
        },
        {
          "file": "test18.csv",
          "text": "OWCtTW",
          "number": 144135,
          "hex": "jz216e4c907997a4f3879b00426861",
          "status": true
        },
        {
          "file": "test18.csv",
          "text": "yOHQVf",
          "number": 5020,
          "hex": "jz88ac396497d2a10874297b94478b",
          "status": false
        }
      ]

      // when
      const result = ConvertCSVtoJSON.CSVtoJSON(csvStr)

      // then
      expect(result.length).to.equal(jsonResponse.length)
      expect(JSON.stringify(result)).to.equal(JSON.stringify(jsonResponse))
    })
  })

  context('invalid CSV', function() {
    it('should be not equal', function() {
      // given
      const csvStr =
        `file,text,number,hex
test2.csv,KCwzt
test2.csv,tgteXhEfBnPAaHaoUxhAYrmX,96,7cca49c4694ca0ad528ba82f4c9400e7`
      const jsonResponse = [
        {
          "file": "test2.csv",
          "text": "KCwzt",
          "number": 101,
          "hex": ""
        },
        {
          "file": "test2.csv",
          "text": "tgteXhEfBnPAaHaoUxhAYrmX",
          "number": 96,
          "hex": "7cca49c4694ca0ad528ba82f4c9400e7ASDASDA"
        }
      ]

      // when
      const result = ConvertCSVtoJSON.CSVtoJSON(csvStr)

      // then
      expect(result.length).to.equal(jsonResponse.length)
      expect(JSON.stringify(result)).to.not.equal(JSON.stringify(jsonResponse))
    })

    it('incorrect CSV format', function() {
      // given
      const csvStr =
        `file,text,number,hex`

      // when
      const result = ConvertCSVtoJSON.CSVtoJSON(csvStr)

      // then
      expect(result).to.not.equal(null)
    })
  })

})


describe('customJSONFormat()', function() {

  context('valid Format', function() {
    it('should be equals', function() {
      // given
      const jsonResponse = [
        {
          "file": "test2.csv",
          "text": "KCwzt",
          "number": "",
          "hex": ""
        },
        {
          "file": "test2.csv",
          "text": "tgteXhEfBnPAaHaoUxhAYrmX",
          "number": 96,
          "hex": "7cca49c4694ca0ad528ba82f4c9400e7"
        }
      ]
      const customResult = {
        "file": "test2.csv",
        "lines": [
          {
            "text": "KCwzt",
            "number": "",
            "hex": ""
          },
          {
            "text": "tgteXhEfBnPAaHaoUxhAYrmX",
            "number": 96,
            "hex": "7cca49c4694ca0ad528ba82f4c9400e7"
          }
        ]
      }

      // when
      const result = ConvertCSVtoJSON.customJSONFormat(jsonResponse)

      // then
      expect(JSON.stringify(result)).to.equal(JSON.stringify(customResult))
    })

    it('should be return valid Format without error lines', function() {
      // given
      const jsonResponse = [
        {
          "file": "test2.csv",
          "text": "tgteXhEfBnPAaHaoUxhAYrmX",
          "number": 96,
          "hex": "7cca49c4694ca0ad528ba82f4c9400e7"
        }
      ]
      const customFormat = {
        "file": "test2.csv",
        "lines": [
          {
            "text": "tgteXhEfBnPAaHaoUxhAYrmX",
            "number": 96,
            "hex": "7cca49c4694ca0ad528ba82f4c9400e7"
          }
        ]
      }

      // when
      const result = ConvertCSVtoJSON.customJSONFormat(jsonResponse)

      // then
      expect(JSON.stringify(result)).to.equal(JSON.stringify(customFormat))
    })

    it('should be return valid Format with mixin formats', function() {
      // given
      const jsonResponse = [
        {
          "file": "test18.csv",
          "text": "vnaTwFwNVVLjVJjutX",
          "number": 478,
          "hex": "jz9783f2e9029a1add828699068a89",
          "status": true
        },
        {
          "file": "test18.csv",
          "text": "YPrJiwMbZzsLCImqXEzoetU",
          "number": 7267800450,
          "hex": "jzcc0e80704170f399179bfae95b02",
          "status": true
        },
        {
          "file": "test18.csv",
          "text": "I",
          "number": 858952,
          "hex": "jzdf7ba615a115f2eff0fb6a549aef",
          "status": true
        },
        {
          "file": "test18.csv",
          "text": "OWCtTW",
          "number": 144135,
          "hex": "jz216e4c907997a4f3879b00426861",
          "status": true
        },
        {
          "file": "test18.csv",
          "text": "yOHQVf",
          "number": 5020,
          "hex": "jz88ac396497d2a10874297b94478b",
          "status": false
        }
      ]
      const customFormat = {
        "file": "test18.csv",
        "lines": [
          {
            "text": "vnaTwFwNVVLjVJjutX",
            "number": 478,
            "hex": "jz9783f2e9029a1add828699068a89",
            "status": true
          },
          {
            "text": "YPrJiwMbZzsLCImqXEzoetU",
            "number": 7267800450,
            "hex": "jzcc0e80704170f399179bfae95b02",
            "status": true
          },
          {
            "text": "I",
            "number": 858952,
            "hex": "jzdf7ba615a115f2eff0fb6a549aef",
            "status": true
          },
          {
            "text": "OWCtTW",
            "number": 144135,
            "hex": "jz216e4c907997a4f3879b00426861",
            "status": true
          },
          {
            "text": "yOHQVf",
            "number": 5020,
            "hex": "jz88ac396497d2a10874297b94478b",
            "status": false
          }
        ]
      }

      // when
      const result = ConvertCSVtoJSON.customJSONFormat(jsonResponse)

      // then
      expect(JSON.stringify(result)).to.equal(JSON.stringify(customFormat))
    })
  })

  context('invalid Format', function() {
    it('should be return empty json', function() {
      // given
      const jsonResponse = []

      // when
      const result = ConvertCSVtoJSON.customJSONFormat(jsonResponse)

      // then
      expect(JSON.stringify(result)).to.equal(JSON.stringify({}))
    })

    it('should be return empty json with input null', function() {
      // given
      const jsonResponse = null;

      // when
      const result = ConvertCSVtoJSON.customJSONFormat(jsonResponse)

      // then
      expect(JSON.stringify(result)).to.equal(JSON.stringify({}))
    })
  })

})