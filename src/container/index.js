const {createContainer, InjectionMode} = require("awilix");
const {registerEnvironment} = require("./environment");
const {registerRestApi} = require("./api");

const configureContainer = () => {
  const container = createContainer({
    injectionMode: InjectionMode.PROXY,
  });

  registerEnvironment(container);
  registerRestApi(container);

  return container;
}

module.exports = {configureContainer};