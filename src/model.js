const {
  always,
  dec,
  ifElse,
  inc,
  lensProp,
  not,
  over,
  pipe,
  propEq,
} = require('ramda');

const applyToProp = (prop, toApply, lastPipedFn) => pipe(
  over(lensProp(prop), toApply),
  lastPipedFn,
);

const model = (state = {
  agentAvailable: true,
  queuedCustomers: 0,
}) => ({
  status: always(state),
  arrival: () => ifElse(
    propEq('agentAvailable', true),
    applyToProp('agentAvailable', not, model),
    applyToProp('queuedCustomers', inc, model),
  )(state),
  departure: () => ifElse(
    propEq('queuedCustomers', 0),
    applyToProp('agentAvailable', not, model),
    applyToProp('queuedCustomers', dec, model),
  )(state),
});

module.exports = { model };
