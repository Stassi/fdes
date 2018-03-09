const { expect } = require('chai');
const { model } = require('../src/model');

describe('model', () => {
  describe('#arrival', () => {
    it('should reflect agent busy when agent is available', () => {
      const { status } = model({
        agentAvailable: true,
        queuedCustomers: 0,
      }).arrival();

      expect(status()).to.include({
        agentAvailable: false,
        queuedCustomers: 0,
      });
    });

    it('should increment queue when agent is busy', () => {
      const { status } = model({
        agentAvailable: false,
        queuedCustomers: 0,
      }).arrival();

      expect(status()).to.include({
        agentAvailable: false,
        queuedCustomers: 1,
      });
    });
  });

  describe('#departure', () => {
    it('should reflect agent available when queue is empty', () => {
      const { status } = model({
        agentAvailable: false,
        queuedCustomers: 0,
      }).departure();

      expect(status()).to.include({
        agentAvailable: true,
        queuedCustomers: 0,
      });
    });

    it('should decrement queue when queue is not empty', () => {
      const { status } = model({
        agentAvailable: false,
        queuedCustomers: 1,
      }).departure();

      expect(status()).to.include({
        agentAvailable: false,
        queuedCustomers: 0,
      });
    });
  });
});
