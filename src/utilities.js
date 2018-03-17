const {
  always,
  call,
  converge,
  curry,
  head,
  identity,
  lensProp,
  over,
  pipe,
  prop,
  set,
} = require('ramda');

const applyOverProp = curry((property, toApply, state) => over(
  lensProp(property),
  toApply,
  state,
));

const callProp = property => pipe(
  prop(property),
  call,
);

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
  callProp,
  setPropToHead,
};

module.exports = utilities;
