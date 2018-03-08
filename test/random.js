const { expect } = require('chai');
const { generateSeed } = require('../src/random');

describe('#hex16', () => {
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
        expect(seedGen1()).to.equal('ac7b289790934096');
      });
    });

    describe('#seed generation 2 + n', () => {
      it('should be deterministic when chain-evolved from a known seed', () => {
        expect(seedGen2()).to.equal('ab91fae519c4758d');
      });
    });
  });

  describe('#natural', () => {
    it('should have tests');
  });
});
