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

const registerArrivalInModel = callMethodOverProp('model', 'arrival');
const registerDepartureInModel = callMethodOverProp('model', 'departure');
const evolveSeed = callMethodOverProp('randomSeed', 'evolve');
const loadNextEvent = callMethodOverProp('events', 'doNext');
const incrementIterations = callMethodOverProp('iterationCounter', 'increment');

const useCurrentEventTimeAsClockTime = pipe(
  currentEventTime,
  clock,
);
const setClockTime = convergeSetProp('clock', useCurrentEventTimeAsClockTime);

const scheduleEvent = callPathWithArg(['events', 'schedule']);
const randomNatural = callPathWithArg(['randomSeed', 'natural']);

const minutesToMilliseconds = multiply(60000);

// TODO: Parameterize initial values
const initialEvent = { name: 'arrival', time: 0 };
const initialSeed = NaN;

// TODO: Parameterize, reduce duplication
const scheduleArrival = convergeSetProp(
  'events',
  converge(scheduleEvent, [
    applySpec({
      name: always('arrival'),
      time: converge(add, [
        currentEventTime,
        randomNatural({
          min: minutesToMilliseconds(2),
          max: minutesToMilliseconds(20),
        }),
      ]),
    }),
    identity,
  ]),
);

// TODO: Parameterize, reduce duplication
const scheduleDeparture = convergeSetProp(
  'events',
  converge(scheduleEvent, [
    applySpec({
      name: always('departure'),
      time: converge(add, [
        currentEventTime,
        randomNatural({
          min: minutesToMilliseconds(3),
          max: minutesToMilliseconds(17),
        }),
      ]),
    }),
    identity,
  ]),
);

const doArrival = pipe(
  registerArrivalInModel,
  evolveSeed,
  scheduleArrival,
  evolveSeed,
  scheduleDeparture,
);

const doEvent = cond([
  [ifArrival, doArrival],
  [ifDeparture, registerDepartureInModel],
]);

// TODO: Implement
const statistics = identity;

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
