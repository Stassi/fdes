const {
  always,
  dec,
  ifElse,
  inc,
  not,
  propEq,
} = require('ramda');
const { pipedApplyToProp } = require('./pipedApplyToProp');

const agentAvailable = propEq('agentAvailable', true);
const queuedCustomersEmpty = propEq('queuedCustomers', 0);

const toggleAgentAvailable = pipedApplyToProp('agentAvailable', not);
const applyToQueuedCustomers = pipedApplyToProp('queuedCustomers');

const incrementQueuedCustomers = applyToQueuedCustomers(inc);
const decrementQueuedCustomers = applyToQueuedCustomers(dec);

const model = (state = {
  agentAvailable: true,
  queuedCustomers: 0,
}) => ({
  status: always(state),
  arrival: () => ifElse(
    agentAvailable,
    toggleAgentAvailable(model),
    incrementQueuedCustomers(model),
  )(state),
  departure: () => ifElse(
    queuedCustomersEmpty,
    toggleAgentAvailable(model),
    decrementQueuedCustomers(model),
  )(state),
});

module.exports = { model };
