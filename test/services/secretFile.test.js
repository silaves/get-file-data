import chai from "chai"
import sinon from "sinon"
import axios from "axios"
import {configureContainer} from "../../src/container/index.js";
import {SecretFileService} from "../../src/services/secretFiles.js";
import {secretFileConnection} from "../../src/utils/secretFileConnection.js";

const expect = chai.expect
let container = configureContainer()
// const service = container.cradle.secretFileService

describe('Getting File List', () => {
  let stub;

  const mockedResponseObj = [
    {
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
    },
    {
      "file": "test3.csv",
      "lines": [
        {
          "text": "FFsAh",
          "number": "",
          "hex": ""
        },
        {
          "text": "YpuYRFsBcGhZNuKwCl",
          "number": 83451551,
          "hex": "18c8caf59007104f86ba6cdb82e421f2"
        },
        {
          "text": "raUdQoIEgoUsIVfgWFDiXgG",
          "number": 11762090,
          "hex": "ff39a40ecff2bb84f6a53b73f203b771"
        },
        {
          "text": "kIr",
          "number": 442713,
          "hex": "12fc7ba081b8e21b030f746eb7a633a7"
        }
      ]
    }
  ]

  beforeEach(() => {
    stub = sinon.stub(axios, 'get').resolves(mockedResponseObj);
  });

  afterEach(() => {
    stub.restore();
  });

  it('should return all todos with the right properties', done => {
    const service = new SecretFileService({
      appConfig: container.cradle.appConfig,
      secretFileConnection: secretFileConnection({appConfig: container.cradle.appConfig})
    });
    const response = service.getSecretFilesList().then(res => {

      console.log(res)
      expect(res.length).to.equal(100)
      // expect(res.data[0]).to.equal(2)
      expect(res.data).to.have.keys(Object.keys(mockedResponseObj))
    }).then(done, done)

  });
});