const { events } = require('./events');
const { iterationCounter } = require('./iterationCounter');
const { model } = require('./model');
const { options } = require('./options');
const { randomSeed } = require('./randomSeed');

const components = {
  events,
  iterationCounter,
  model,
  options,
  randomSeed,
};

module.exports = components;
