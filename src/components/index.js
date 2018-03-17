const { clock } = require('./clock');
const { events } = require('./events');
const { iterationCounter } = require('./iterationCounter');
const { model } = require('./model');
const { randomSeed } = require('./randomSeed');

const components = {
  clock,
  events,
  iterationCounter,
  model,
  randomSeed,
};

module.exports = components;
