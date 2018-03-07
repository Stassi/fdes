const { expect } = require('chai');
const { hex16 } = require('../src/random');

describe('hex16', () => {
  const knownSeed = 'known seed';
  const { evolve, seed } = hex16(knownSeed);
  const { evolve: evolveGen1, seed: seedGen1 } = evolve();

  describe('seed', () => {
    it('should return the constructed seed', () => {
      expect(seed()).to.equal(knownSeed);
    });
  });

  describe('evolve', () => {
    it('should transform #seed to return a value different than constructed', () => {
      expect(seedGen1()).to.be.a('String').and.not.equal(knownSeed);
    });

    it('should be chainable', () => {
      const { seed: seedGen2 } = evolveGen1();
      expect(seedGen2()).to.be.a('String');
    });

    it('should be deterministic when chained and constructed from a known seed');
  });

  describe('natural', () => {
    it('should have tests');
  });
});
