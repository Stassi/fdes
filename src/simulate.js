const {
  add,
  always,
  applySpec,
  cond,
  converge,
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

const currentEventTime = pipe(
  eventsStatus,
  path(['current', 'time']),
);

const currentEventName = pipe(
  eventsStatus,
  path(['current', 'name']),
);

const eventNameEquals = name => pipe(
  currentEventName,
  equals(name),
);

const ifArrival = eventNameEquals('arrival');
const ifDeparture = eventNameEquals('departure');

// TODO: Integrate
const registerDepartureInModel = callMethodOverProp('model', 'departure');

const registerArrivalInModel = callMethodOverProp('model', 'arrival');
const evolveSeed = callMethodOverProp('randomSeed', 'evolve');

// TODO: Implement all
const doDeparture = identity;
const statistics = identity;

const randomNatural = callPathWithArg(['randomSeed', 'natural']);
const scheduleEvent = callPathWithArg(['events', 'schedule']);

const minutesToMilliseconds = multiply(60000);

const scheduleNextEvent = (name, interEventTime) => converge(scheduleEvent, [
  applySpec({
    name: always(name),
    time: converge(add, [
      interEventTime,
      currentEventTime,
    ]),
  }),
  identity,
]);

// TODO: Parameterize
const scheduleNextArrival = scheduleNextEvent(
  'arrival',
  randomNatural({
    min: minutesToMilliseconds(2),
    max: minutesToMilliseconds(20),
  }),
);

// TODO: Parameterize
const scheduleNextDeparture = scheduleNextEvent(
  'departure',
  randomNatural({
    min: minutesToMilliseconds(3),
    max: minutesToMilliseconds(17),
  }),
);

const scheduleArrival = convergeSetProp('events', scheduleNextArrival);
const scheduleDeparture = convergeSetProp('events', scheduleNextDeparture);

const doArrival = pipe(
  registerArrivalInModel,
  evolveSeed,
  scheduleArrival,
  evolveSeed,
  scheduleDeparture,
);

const doEvent = cond([
  [ifArrival, doArrival],
  [ifDeparture, doDeparture],

  // TODO: Remove upon implementation of previous conditions
  [T, identity],
]);

const useCurrentEventTimeAsClockTime = pipe(
  currentEventTime,
  clock,
);
const setClockTime = convergeSetProp('clock', useCurrentEventTimeAsClockTime);

const loadNextEvent = callMethodOverProp('events', 'doNext');
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
  randomSeed: randomSeed()(initialSeed),
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
