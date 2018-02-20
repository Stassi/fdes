const {
  always,
  append,
  ascend,
  call,
  drop,
  flip,
  head,
  pipe,
  prop,
  sort,
} = require('ramda');

const appendTo = flip(append);
const sortByTimeAscending = sort(ascend(prop('time')));

const events = (state = []) => ({
  create: pipe(
    appendTo(state),
    sortByTimeAscending,
    events,
  ),
  doNext: fn => {
    call(fn, head(state));
    return events(drop(1, state));
  },

  queue: always(state),
});

module.exports = { events };
