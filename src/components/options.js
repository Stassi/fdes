const {
  defaultTo,
  keys,
  merge,
  pick,
  pipe,
} = require('ramda');

const defaults = {
  iterationLimit: 128,
  meanInterArrivalTime: 8,
  meanServiceTime: 8,
  seed: NaN,
};

const pickKeys = pipe(keys, pick);

const options = pipe(
  defaultTo({}),
  pickKeys(defaults),
  merge(defaults),
);

module.exports = { options };
