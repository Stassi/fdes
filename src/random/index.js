const {
  always,
  flip,
  pipe,
} = require('ramda');
const { natural, string } = require('./chance');

const hex16 = (state = NaN) => ({
  seed: always(state),
  evolve: () => pipe(
    string({
      length: 16,
      pool: '0123456789abcdef',
    }),
    hex16,
  )(state),
  natural: flip(natural)(state),
});

module.exports = { hex16 };
