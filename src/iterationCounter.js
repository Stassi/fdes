const {
  always,
  converge,
  gte,
  inc,
  pipe,
  prop,
} = require('ramda');
const { applyToProp } = require('./utilities');

const incrementIterations = applyToProp('iterations', inc);

// TODO: Parameterize prop values, extract to utilities
const iterationsGTELimit = converge(gte, [
  prop('iterations'),
  prop('limit'),
]);

const iterationCounter = (state = {
  iterations: 0,
  limit: 20,
}) => ({
  status: always(state),
  increment: () => pipe(
    incrementIterations,
    iterationCounter,
  )(state),
  limitReached: () => iterationsGTELimit(state),
});

module.exports = { iterationCounter };
