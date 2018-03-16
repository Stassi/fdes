const {
  always,
  dec,
  ifElse,
  inc,
  not,
  pipe,
  propEq,
} = require('ramda');
const { applyOverProp } = require('./utilities');

const agentAvailable = propEq('agentAvailable', true);
const queuedCustomersEmpty = propEq('queuedCustomers', 0);

const toggleAgentAvailable = applyOverProp('agentAvailable', not);
const applyOverQueuedCustomers = applyOverProp('queuedCustomers');
const incrementQueuedCustomers = applyOverQueuedCustomers(inc);
const decrementQueuedCustomers = applyOverQueuedCustomers(dec);

const model = (state = {
  agentAvailable: true,
  queuedCustomers: 0,
}) => ({
  status: always(state),
  arrival: () => ifElse(
    agentAvailable,
    pipe(toggleAgentAvailable, model),
    pipe(incrementQueuedCustomers, model),
  )(state),
  departure: () => ifElse(
    queuedCustomersEmpty,
    pipe(toggleAgentAvailable, model),
    pipe(decrementQueuedCustomers, model),
  )(state),
});

module.exports = { model };
