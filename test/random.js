const { expect } = require('chai');
const { generateSeed } = require('../src/random');

describe('generateSeed', () => {
  const knownSeed = 'known seed';
  const { seed: seedGen0, evolve: evolveGen0 } = generateSeed()(knownSeed);
  const { seed: seedGen1, evolve: evolveGen1 } = evolveGen0();
  const { seed: seedGen2 } = evolveGen1();

  describe('#seed', () => {
    it('should return the constructed seed', () => {
      expect(seedGen0()).to.equal(knownSeed);
    });
  });

  describe('#evolve', () => {
    describe('#seed generation 1', () => {
      it('should be deterministic when evolved from a known seed', () => {
        expect(seedGen1()).to.equal('w3q0etvrvbuilbvn');
      });
    });

    describe('#seed generation 2 + n', () => {
      it('should be deterministic when chain-evolved from a known seed', () => {
        expect(seedGen2()).to.equal('jk2tuz31dkcd0lld');
      });
    });
  });

  describe('#natural', () => {
    it('should have tests');
  });
});
