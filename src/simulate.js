const {
  always,
  call,
  cond,
  equals,
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

// TODO: Replace with callPath
const iterationLimitReached = pipe(
  path(['iterationCounter', 'limitReached']),
  call,
);

const eventsStatus = callPath(['events', 'status']);

const useEventTimeAsClockTime = pipe(
  eventsStatus,
  path(['current', 'time']),
  clock,
);

const eventName = pipe(
  eventsStatus,
  path(['current', 'name']),
);

const eventNameEquals = name => pipe(
  eventName,
  equals(name),
);

const ifArrival = eventNameEquals('arrival');
const ifDeparture = eventNameEquals('departure');

// TODO: Implement all
const onArrival = identity;
const onDeparture = identity;
const statistics = identity;

// TODO: Complete implementation && rename function
// const performEvent = cond([
//   [ifArrival, onArrival],
//   [ifDeparture, onDeparture],
// ]);
const performEvent = identity;

const doNextEvent = callMethodOverProp('events', 'doNext');
const setClockTime = convergeSetProp('clock', useEventTimeAsClockTime);
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
