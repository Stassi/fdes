const { expect } = require('chai');
const { iterationCounter } = require('../src/iterationCounter');

describe('iterationCounter', () => {
  describe('#increment', () => {
    it('should increment iterations +1', () => {
      const { status } = iterationCounter({ iterations: 0, limit: 5 })
        .increment();
      expect(status()).to.contain({ iterations: 1 });
    });
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
