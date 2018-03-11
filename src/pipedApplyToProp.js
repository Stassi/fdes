const {
  curry,
  lensProp,
  over,
  pipe,
} = require('ramda');

const pipedApplyToProp = curry((prop, toApply, lastPipedFn) => pipe(
  over(lensProp(prop), toApply),
  lastPipedFn,
));

module.exports = { pipedApplyToProp };
