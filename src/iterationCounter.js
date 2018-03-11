const {
  always,
  converge,
  inc,
  gte,
  prop,
} = require('ramda');
const { pipedApplyToProp } = require('./pipedApplyToProp');

const incrementProp = pipedApplyToProp('iterations', inc);

const iterationsGTELimit = converge(gte, [
  prop('iterations'),
  prop('limit'),
]);

const iterationCounter = (state = {
  iterations: 0,
  limit: 20,
}) => ({
  status: always(state),
  increment: () => incrementProp(iterationCounter)(state),
  limitReached: () => iterationsGTELimit(state),
});

module.exports = { iterationCounter };
