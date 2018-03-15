const {
  always,
  pipe,
} = require('ramda');
const { appendToProp } = require('./appendToProp');
const { sortPropByKeyAscending } = require('./sortPropByKeyAscending');

const appendToQueue = appendToProp('queue');
const sortQueueByTimeAscending = sortPropByKeyAscending('queue', 'time');

const events = (state = {
  current: null,
  queue: [],
}) => ({
  status: always(state),
  schedule: pipe(
    appendToQueue(state),
    sortQueueByTimeAscending,
    events,
  ),
});

module.exports = { events };
