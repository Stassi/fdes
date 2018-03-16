const {
  always,
  drop,
  pipe,
} = require('ramda');
const {
  appendOverProp,
  applyOverProp,
  setPropToHead,
  sortPropByKeyAscending,
} = require('./utilities');

const setCurrentToQueueHead = setPropToHead('current', 'queue');
const dropQueueHead = applyOverProp('queue', drop(1));
const appendToQueue = appendOverProp('queue');
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
