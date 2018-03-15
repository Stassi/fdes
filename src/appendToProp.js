const {
  append,
  curry,
  lensProp,
  over,
} = require('ramda');

const appendToProp = curry((property, state, toAppend) => over(
  lensProp(property),
  append(toAppend),
)(state));

module.exports = { appendToProp };
