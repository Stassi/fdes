const { always } = require('ramda');

const iterationCounter = (state = {
  iterations: 0,
  limit: 20,
}) => ({
  status: always(state),

  // TODO: Implement
  increment: always(null),

  // TODO: Implement
  limitReached: always(null),
});

module.exports = { iterationCounter };
