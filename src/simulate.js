const {
  call,
  identity,
  ifElse,
  path,
  pipe,
}  = require('ramda');
const {
  clock,
  events,
  iterationCounter,
  model,
  randomSeed,
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
