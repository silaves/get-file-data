import chaiHttp from "chai-http";
import chai from "chai";
import {configureContainer} from "../../../src/container/index.js";
import sinon from "sinon";
import axios from "axios";
import {SecretFileService} from "../../../src/services/secretFiles.js";
import {asClass} from "awilix";

const expect = chai.expect
let container = configureContainer()

chai.use(chaiHttp);

describe('/GET book', () => {

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

  // beforeEach(() => {
  //   stub = sinon.stub(SecretFileService, "getSecretFilesList");
  // });
  //
  afterEach(() => {
    sinon.restore();
  });


  it('GET Secret Files Data', (done) => {
    const app = container.cradle.express
    // const mock = sinon.mock(SecretFileService)
    // mock.expects("getSecretFilesList").once().returns(Promise.resolve());
    const pageOfUsers = {
      page: 1,
      total_pages: 1,
    };
    const callStub = sinon.stub(SecretFileService.prototype, "getSecretFilesList").callsFake( function () { return []; });
    // callStub.returns(Promise.resolve(pageOfUsers));
    container.register({
      secretFileService: asClass(SecretFileService).singleton(),
    })
    chai.request(app)
      .get('/api/files/data')
      .end((err, res) => {
        // console.log(res)
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('array');
      });

    done();
  });
});