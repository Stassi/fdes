const {
  cond,
  equals,
  identity,
  ifElse,
  path,
  pipe,
  T,
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

const iterationLimitReached = callPath(['iterationCounter', 'limitReached']);
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
const doArrival = identity;
const doDeparture = identity;
const statistics = identity;

const doEvent = cond([
  [ifArrival, doArrival],
  [ifDeparture, doDeparture],

  // TODO: Remove upon implementation of previous conditions
  [T, identity],
]);

const loadNextEvent = callMethodOverProp('events', 'doNext');
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
    loadNextEvent,
    setClockTime,
    doEvent,
    incrementIterations,
    simulate,
  ),
)(state);

module.exports = { simulate };
