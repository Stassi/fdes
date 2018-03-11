const {
  always,
  curry,
  dec,
  ifElse,
  inc,
  lensProp,
  not,
  over,
  pipe,
  propEq,
} = require('ramda');

const applyToProp = curry((prop, toApply, lastPipedFn) => pipe(
  over(lensProp(prop), toApply),
  lastPipedFn,
));

const toggleAgentAvailable = applyToProp('agentAvailable', not);
const applyToQueuedCustomers = applyToProp('queuedCustomers');

const incrementQueuedCustomers = applyToQueuedCustomers(inc);
const decrementQueuedCustomers = applyToQueuedCustomers(dec);

const model = (state = {
  agentAvailable: true,
  queuedCustomers: 0,
}) => ({
  status: always(state),
  arrival: () => ifElse(
    propEq('agentAvailable', true),
    toggleAgentAvailable(model),
    incrementQueuedCustomers(model),
  )(state),
  departure: () => ifElse(
    propEq('queuedCustomers', 0),
    toggleAgentAvailable(model),
    decrementQueuedCustomers(model),
  )(state),
});

module.exports = { model };
