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
const {
  callPath,
  callMethodOverProp,
  convergeSetProp,
} = require('./utilities');

const iterationLimitReached = pipe(
  path(['iterationCounter', 'limitReached']),
  call,
);

const createClockWithEventTime = pipe(
  callPath(['events', 'status']),
  path(['current', 'time']),
  clock,
);

// TODO: Implement all
const statistics = identity;
const performEvent = identity;

const doNextEvent = callMethodOverProp('events', 'doNext');
const setClockTime = convergeSetProp('clock', createClockWithEventTime);
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
    setClockTime,
    performEvent,
    incrementIterations,
    simulate,
  ),
)(state);

module.exports = { simulate };
