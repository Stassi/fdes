const {
  always,
  call,
  converge,
  curry,
  head,
  identity,
  lensProp,
  over,
  path,
  pipe,
  prop,
  set,
} = require('ramda');

const applyOverProp = curry((property, toApply, state) => over(
  lensProp(property),
  toApply,
  state,
));

const callPath = pathToCall => pipe(
  path(pathToCall),
  call,
);

const callProp = property => pipe(
  prop(property),
  call,
);

const callMethodOverProp = (property, methodProp) => applyOverProp(
  property,
  callProp(methodProp),
);

const convergeSetProp = (property, toSet) => converge(set, [
  pipe(
    lensProp,
    always,
  )(property),
  toSet,
  identity,
]);

const setPropToHead = (setProp, collection) => converge(set, [
  pipe(
    lensProp,
    always,
  )(setProp),
  pipe(
    prop(collection),
    head,
  ),
  identity,
]);

const utilities = {
  applyOverProp,
  callMethodOverProp,
  callPath,
  convergeSetProp,
  setPropToHead,
};

module.exports = utilities;
