const {
  call,
  identity,
  ifElse,
  path,
  pipe,
}  = require('ramda');
const {
  clock,
  events,
  iterationCounter,
  model,
  randomSeed,
} = require('./components');
const { callMethodOverProp } = require('./utilities');

const iterationLimitReached = pipe(
  path(['iterationCounter', 'limitReached']),
  call,
);

// TODO: Implement all
const statistics = identity;
const updateClockTime = identity;
const performEvent = identity;

const doNextEvent = callMethodOverProp('events', 'doNext');
const incrementIterations = callMethodOverProp('iterationCounter', 'increment');

const initialEvent = { name: 'arrival', time: 0 };

const simulate = (state = {
  clock: clock(),
  events: events()
    .schedule(initialEvent),
  iterationCounter: iterationCounter(),
}) => ifElse(
  iterationLimitReached,
  statistics,
  pipe(
    doNextEvent,
    updateClockTime,
    performEvent,
    incrementIterations,
    simulate,
  ),
)(state);

module.exports = { simulate };
