const { expect } = require('chai');
const { time } = require('../src/time');

describe('time', () => {
  describe('#now', () => {
    const { now } = time();
    it('should be a Number', () => {
      expect(now()).to.be.a('Number');
    });
  });

  describe('#increment', () => {
    const ONE_MINUTE = 60000;
    const { increment } = time(0);
    const { now } = increment(ONE_MINUTE);

    it('should transform #now to return incremented state', () => {
      expect(now()).to.equal(ONE_MINUTE);
    });
  });
});
