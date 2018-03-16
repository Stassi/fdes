const {
  always,
  drop,
  pipe,
} = require('ramda');
const {
  appendToProp,
  applyToProp,
  setPropToHead,
  sortPropByKeyAscending,
} = require('./utilities');

const setCurrentToQueueHead = setPropToHead('current', 'queue');
const dropQueueHead = applyToProp('queue', drop(1));
const appendToQueue = appendToProp('queue');
const sortQueueByTimeAscending = sortPropByKeyAscending('queue', 'time');

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
