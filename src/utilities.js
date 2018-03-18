const {
  always,
  call,
  converge,
  curry,
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

const utilities = {
  applyOverProp,
  callMethodOverProp,
  callPath,
  convergeSetProp,
};

module.exports = utilities;
