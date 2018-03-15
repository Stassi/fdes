const {
  ascend,
  lensProp,
  over,
  pipe,
  prop,
  sort,
} = require('ramda');

const sortPropByKeyAscending = (property, sortKey) => over(
  lensProp(property),
  pipe(
    prop,
    ascend,
    sort,
  )(sortKey),
);

module.exports = { sortPropByKeyAscending };
