const {
  ifElse,
  identity,
}  = require('ramda');
const {
  events,
  iterationCounter,
  model,
  randomSeed,
  time,
} = require('./components');

// TODO: Implement statistics component
const statistics = identity;

// TODO: Implement main thread, integrate components
const simulate = (state = {}) => ifElse(
  identity,
  identity,
  identity,
);

module.exports = { simulate };
