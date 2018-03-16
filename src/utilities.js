const {
  always,
  ascend,
  append,
  converge,
  curry,
  head,
  identity,
  lensProp,
  over,
  pipe,
  prop,
  set,
  sort,
} = require('ramda');

const applyToProp = (property, toApply) => over(
  lensProp(property),
  toApply,
);

const appendToProp = curry((property, state, toAppend) => applyToProp(
  property,
  append(toAppend),
)(state));

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

const sortPropByKeyAscending = (property, sortKey) => over(
  lensProp(property),
  pipe(
    prop,
    ascend,
    sort,
  )(sortKey),
);

const utilities = {
  appendToProp,
  applyToProp,
  setPropToHead,
  sortPropByKeyAscending,
};

module.exports = utilities;
