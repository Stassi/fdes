const {
  always,
  append,
  ascend,
  curry,
  drop,
  head,
  pipe,
  prop,
  sort,
} = require('ramda');
const {
  applyOverProp,
  convergeSetProp,
} = require('../utilities');

const setCurrentToQueueHead = convergeSetProp(
  'current',
  pipe(
    prop('queue'),
    head,
  ),
);

const applyOverQueue = applyOverProp('queue');
const dropQueueHead = applyOverQueue(drop(1));
const appendToQueue = curry((state, toAppend) => applyOverQueue(
  append(toAppend),
  state,
));
const sortQueueByTimeAscending = applyOverQueue(pipe(
  prop,
  ascend,
  sort,
)('time'));

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
