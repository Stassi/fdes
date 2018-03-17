const {
  add,
  always,
  pipe,
} = require('ramda');

const time = (state = 0) => ({
  now: always(state),
  increment: pipe(
    add(state),
    time,
  ),
});

module.exports = { time };
