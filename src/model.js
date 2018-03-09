const {
  always,
  assoc,
  inc,
  lensProp,
  over,
} = require('ramda');

const model = (state = {
  agentAvailable: true,
  queuedCustomers: 0,
}) => ({
  status: always(state),
  arrival: () => {
    if (state.agentAvailable) {
      return model(assoc('agentAvailable', false, state));
    } else {
      return model(over(lensProp('queuedCustomers'), inc, state));
    }
  },

  // TODO: Implement departure
});

module.exports = { model };
