const {
  cond,
  equals,
  identity,
  ifElse,
  multiply,
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
  callMethodOverProp,
  callPath,
  callPathWithArg,
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

// TODO: Integrate
const registerDepartureInModel = callMethodOverProp('model', 'departure');
const registerArrivalInModel = callMethodOverProp('model', 'arrival');

// TODO: Implement all
const scheduleArrival = identity;
const scheduleDeparture = identity;
const doDeparture = identity;
const statistics = identity;

const randomNatural = callPathWithArg(['randomSeed', 'natural']);

const minutesToMilliseconds = multiply(60000);

// TODO: Parameterize
const interArrivalOptions = {
  min: minutesToMilliseconds(2),
  max: minutesToMilliseconds(20),
};

// TODO: Integrate interArrivalTime within scheduleArrival
const interArrivalTime = randomNatural(interArrivalOptions);

const doArrival = pipe(
  registerArrivalInModel,
  scheduleArrival,
  scheduleDeparture,
);

const doEvent = cond([
  [ifArrival, doArrival],
  [ifDeparture, doDeparture],

  // TODO: Remove upon implementation of previous conditions
  [T, identity],
]);

const loadNextEvent = callMethodOverProp('events', 'doNext');
const setClockTime = convergeSetProp('clock', useEventTimeAsClockTime);
const incrementIterations = callMethodOverProp('iterationCounter', 'increment');

// TODO: Parameterize initial values
const initialEvent = { name: 'arrival', time: 0 };
const initialSeed = NaN;

const simulate = (state = {
  clock: clock(),
  events: events()
    .schedule(initialEvent),
  iterationCounter: iterationCounter(),
  model: model(),
  randomSeed: randomSeed()(initialSeed)
    .evolve(),
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
