const {
  call,
  identity,
  ifElse,
  path,
  pipe,
}  = require('ramda');
const {
  events,
  iterationCounter,
  model,
  randomSeed,
  time,
} = require('./components');
const { applyOverProp, callProp } = require('./utilities');

const iterationLimitReached = pipe(
  path(['iterationCounter', 'limitReached']),
  call,
);

// TODO: Implement all
const statistics = identity;
const mainThread = identity;

const callIncrement = callProp('increment');
const applyOverIterationCounter = applyOverProp('iterationCounter');
const incrementIterations = applyOverIterationCounter(callIncrement);

// TODO: Implement main thread, integrate components
const simulate = (state = {
  iterationCounter: iterationCounter(),
}) => ifElse(
  iterationLimitReached,
  statistics,
  pipe(
    mainThread,
    incrementIterations,
    simulate,
  ),
)(state);

module.exports = { simulate };
