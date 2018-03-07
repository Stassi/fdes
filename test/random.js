const { expect } = require('chai');
const { hex16 } = require('../src/random');

describe('hex16', () => {
  const knownSeed = 'known seed';

  describe('seed', () => {
    it('should return the constructed seed', () => {
      const { seed } = hex16(knownSeed);
      expect(seed()).to.equal(knownSeed);
    });
  });

  describe('evolve', () => {
    it('should transform #seed to return a value different than constructed');
    it('should be chainable');
    it('should be deterministic when chained and constructed from a known seed');
  });

  describe('natural', () => {
    it('should have tests');
  });
});
