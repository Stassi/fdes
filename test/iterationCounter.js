const { expect } = require('chai');
const { iterationCounter } = require('../src/iterationCounter');

describe('iterationCounter', () => {
  describe('#increment', () => {
    const { increment } = iterationCounter({ iterations: 0, limit: 5 });

    it('should increment iterations +1', () => {
      const { status } = increment();
      expect(status()).to.contain({ iterations: 1 });
    });

    it('should be chainable', () => {
      const { status } = increment()
        .increment();
      expect(status()).to.contain({ iterations: 2 });
    });
  });

  describe('#limitReached', () => {
    const limit = 1;

    it('should return true when iterations > limit', () => {
      const { limitReached } = iterationCounter({ limit, iterations: 2 });
      expect(limitReached()).to.be.true;
    });

    it('should return true when iterations == limit', () => {
      const { limitReached } = iterationCounter({ limit, iterations: 1 });
      expect(limitReached()).to.be.true;
    });

    it('should return false when iterations < limit', () => {
      const { limitReached } = iterationCounter({ limit, iterations: 0 });
      expect(limitReached()).to.be.false;
    });
  });
});
