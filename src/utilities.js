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

const applyOverProp = (property, toApply) => over(
  lensProp(property),
  toApply,
);

const appendOverProp = curry((property, state, toAppend) => applyOverProp(
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

const sortPropByKeyAscending = (property, sortKey) => applyOverProp(
  property,
  pipe(
    prop,
    ascend,
    sort,
  )(sortKey),
);

const utilities = {
  appendOverProp,
  applyOverProp,
  setPropToHead,
  sortPropByKeyAscending,
};

module.exports = utilities;
