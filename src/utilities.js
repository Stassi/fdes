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

const appendToProp = curry((property, state, toAppend) => over(
  lensProp(property),
  append(toAppend),
)(state));

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
  dropPropHead,
  setPropToHead,
  sortPropByKeyAscending,
};

module.exports = utilities;
