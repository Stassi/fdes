const { curry, invoker } = require('ramda');
const Chance = require('chance');

const invokeChance = curry((method, options, seed) => invoker(1, method)(
  options,
  Chance(seed)),
);

const chance = {
  natural: invokeChance('natural'),
  normal: invokeChance('normal'),
  random: invokeChance('randomSeed'),
  string: invokeChance('string'),
};

module.exports = chance;
