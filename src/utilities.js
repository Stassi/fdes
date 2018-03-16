const {
  always,
  ascend,
  append,
  converge,
  curry,
  drop,
  head,
  identity,
  lensProp,
  over,
  pipe,
  prop,
  set,
  sort,
} = require('ramda');

// TODO: Attempt state argument removal, attempt uncurry
const appendToProp = curry((property, state, toAppend) => over(
  lensProp(property),
  append(toAppend),
)(state));

const applyToProp = (property, toApply) => over(
  lensProp(property),
  toApply,
);

const dropPropHead = property => over(
  lensProp(property),
  drop(1),
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
  dropPropHead,
  setPropToHead,
  sortPropByKeyAscending,
};

module.exports = utilities;
