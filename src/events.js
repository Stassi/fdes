const {
  always,
  append,
  ascend,
  curry,
  drop,
  pipe,
  prop,
  sort,
} = require('ramda');
const {
  applyOverProp,
  setPropToHead,
} = require('./utilities');

const applyOverQueue = applyOverProp('queue');
const dropQueueHead = applyOverQueue(drop(1));
const appendToQueue = curry((state, toAppend) => applyOverQueue(
  append(toAppend),
  state,
));

const sortByTimeAscending = pipe(
  prop,
  ascend,
  sort,
)('time');
const sortQueueByTimeAscending = applyOverQueue(sortByTimeAscending);

const setCurrentToQueueHead = setPropToHead('current', 'queue');

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
