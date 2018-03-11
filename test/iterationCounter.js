const { expect } = require('chai');
const { iterationCounter } = require('../src/iterationCounter');

describe('iterationCounter', () => {
  describe('#increment', () => {
    it('should have tests');
  });

  describe('#limitReached', () => {
    it('should return true when iterations > limit', () => {
      const { limitReached } = iterationCounter({ iterations: 2, limit: 1 });
      expect(limitReached()).to.be.true;
    });

    it('should return true when iterations == limit', () => {
      const { limitReached } = iterationCounter({ iterations: 1, limit: 1 });
      expect(limitReached()).to.be.true;
    });

    it('should return false when iterations < limit', () => {
      const { limitReached } = iterationCounter({ iterations: 0, limit: 1 });
      expect(limitReached()).to.be.false;
    });
  });
});
