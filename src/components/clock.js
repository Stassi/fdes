const {
  add,
  always,
  pipe,
} = require('ramda');

const clock = (state = 0) => ({
  now: always(state),
  increment: pipe(
    add(state),
    clock,
  ),
});

module.exports = { clock };
