const { events } = require('./events');
const { iterationCounter } = require('./iterationCounter');
const { model } = require('./model');
const { randomSeed } = require('./randomSeed');
const { time } = require('./time');

const components = {
  events,
  iterationCounter,
  model,
  randomSeed,
  time,
};

module.exports = components;
