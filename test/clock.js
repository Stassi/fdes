const { expect } = require('chai');
const { clock } = require('../src/components/clock');

describe('clock', () => {
  describe('#now', () => {
    const { now } = clock();
    it('should be a Number', () => {
      expect(now()).to.be.a('Number');
    });
  });

  describe('#increment', () => {
    const ONE_MINUTE = 60000;
    const { increment } = clock(0);
    const { now } = increment(ONE_MINUTE);

    it('should transform #now to return incremented state', () => {
      expect(now()).to.equal(ONE_MINUTE);
    });
  });
});
