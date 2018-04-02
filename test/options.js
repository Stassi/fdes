const { expect } = require('chai');
const { options } = require('../src/components/options');

describe('options', () => {
  it('should return default values when provided no argument', () => {
    const { seed, ...results } = options()();

    expect(results).to.include({
      iterationLimit: 128,
      meanInterArrivalTime: 8,
      meanServiceTime: 8,
    });

    // NaN tested explicitly as Chai #include cannot test NaN values
    expect(seed).to.be.NaN;
  });

  it('should override defaults with custom parameters', () => {
    const customParameters = {
      iterationLimit: 10,
      meanInterArrivalTime: 30,
      meanServiceTime: 50,
      seed: 'arbitrary deterministic seed',
    };
    const results = options(customParameters);

    expect(results()).to.include(customParameters);
  });
});
