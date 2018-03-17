const {
  always,
  flip,
  pipe,
} = require('ramda');
const { natural, string } = require('./chance');

const alphaNumeric = 'abcdefghijklmnopqrstuvwxyz0123456789';

const randomSeed = (options = {
  length: 16,
  pool: alphaNumeric,
}) => (state = NaN) => ({
  seed: always(state),
  evolve: () => pipe(
    string(options),
    randomSeed(options),
  )(state),
  natural: flip(natural)(state),
});

module.exports = { randomSeed };
