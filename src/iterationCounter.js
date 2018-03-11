const {
  always,
  inc,
} = require('ramda');
const { pipedApplyToProp } = require('./pipedApplyToProp');

const incrementProp = pipedApplyToProp('iterations', inc);

const iterationCounter = (state = {
  iterations: 0,
  limit: 20,
}) => ({
  status: always(state),
  increment: () => incrementProp(iterationCounter)(state),

  // TODO: Implement
  limitReached: always(null),
});

module.exports = { iterationCounter };
