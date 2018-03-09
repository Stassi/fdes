const {
  always,
  assoc,
  dec,
  equals,
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

  departure: () => {
    if (equals(state.queuedCustomers, 0)) {
      return model(assoc('agentAvailable', true, state));
    } else {
      return model(over(lensProp('queuedCustomers'), dec, state));
    }
  },
});

module.exports = { model };
