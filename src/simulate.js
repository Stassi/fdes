const {
  add,
  always,
  applySpec,
  cond,
  converge,
  equals,
  identity,
  ifElse,
  path,
  pipe,
}  = require('ramda');
const {
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

const loadNextEvent = callMethodOverProp('events', 'doNext');
const registerArrivalInModel = callMethodOverProp('model', 'arrival');
const registerDepartureInModel = callMethodOverProp('model', 'departure');
const evolveSeed = callMethodOverProp('randomSeed', 'evolve');
const incrementIterations = callMethodOverProp('iterationCounter', 'increment');

const randomNatural = callPathWithArg(['randomSeed', 'natural']);
const evolveRandomNatural = range => pipe(
  evolveSeed,
  randomNatural(range),
);

// TODO: Extract initial && default values to options module
const initialEvent = { name: 'arrival', time: 0 };
const interArrivalTimeRange = {
  min: 2,
  max: 20,
};
const serviceTimeRange = {
  min: 3,
  max: 17,
};
const initialSeed = NaN;

const scheduleEvent = callPathWithArg(['events', 'schedule']);

// TODO: Parameterize, reduce duplication
const scheduleArrival = convergeSetProp(
  'events',
  converge(scheduleEvent, [
    applySpec({
      name: always('arrival'),
      time: converge(add, [
        currentEventTime,
        evolveRandomNatural(interArrivalTimeRange),
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
        evolveRandomNatural(serviceTimeRange),
      ]),
    }),
    identity,
  ]),
);

const registerArrivalAndDoScheduling = pipe(
  registerArrivalInModel,
  scheduleArrival,
  scheduleDeparture,
);

const doEvent = cond([
  [ifArrival, registerArrivalAndDoScheduling],
  [ifDeparture, registerDepartureInModel],
]);

// TODO: Implement
const statistics = identity;

const simulate = (state = {
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
    doEvent,
    incrementIterations,
    simulate,
  ),
)(state);

module.exports = { simulate };
