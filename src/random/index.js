const {
  always,
  flip,
  pipe,
} = require('ramda');
const { natural, string } = require('./chance');

const generateSeed = (options = {
  length: 16,
  pool: '0123456789abcdef',
}) => (state = NaN) => ({
  seed: always(state),
  evolve: () => pipe(
    string(options),
    generateSeed(options),
  )(state),
  natural: flip(natural)(state),
});

module.exports = { generateSeed };
