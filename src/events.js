const {
  always,
  pipe,
} = require('ramda');
const {
  appendToProp,
  dropPropHead,
  setPropToHead,
  sortPropByKeyAscending,
} = require('./utilities');

const appendToQueue = appendToProp('queue');
const sortQueueByTimeAscending = sortPropByKeyAscending('queue', 'time');
const setCurrentToQueueHead = setPropToHead('current', 'queue');
const dropQueueHead = dropPropHead('queue');

const events = (state = {
  current: null,
  queue: [],
}) => ({
  status: always(state),
  doNext: () => pipe(
    setCurrentToQueueHead,
    dropQueueHead,
    events,
  )(state),
  schedule: pipe(
    appendToQueue(state),
    sortQueueByTimeAscending,
    events,
  ),
});

module.exports = { events };
