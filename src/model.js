const {
  always,
  dec,
  inc,
  lensProp,
  not,
  over,
  pipe,
  propEq,
} = require('ramda');

const applyToProp = (toApply, prop, lastPipedFn) => pipe(
  over(lensProp(prop), toApply),
  lastPipedFn,
);

const model = (state = {
  agentAvailable: true,
  queuedCustomers: 0,
}) => ({
  status: always(state),
  arrival: () => {
    if (propEq('agentAvailable', true, state)) {
      return applyToProp(not, 'agentAvailable', model)(state);
    } else {
      return applyToProp(inc, 'queuedCustomers', model)(state);
    }
  },

  departure: () => {
    if (propEq('queuedCustomers', 0, state)) {
      return applyToProp(not, 'agentAvailable', model)(state);
    } else {
      return applyToProp(dec, 'queuedCustomers', model)(state);
    }
  },
});

module.exports = { model };
