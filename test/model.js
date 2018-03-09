const { expect } = require('chai');
const { model } = require('../src/model');

describe('model', () => {
  describe('#arrival', () => {
    it('should transform #status to agent busy when agent is available', () => {
      const { status } = model({
        agentAvailable: true,
        queuedCustomers: 0,
      }).arrival();

      expect(status()).to.include({
        agentAvailable: false,
        queuedCustomers: 0,
      });
    });

    it('should transform #status to incremented customers if agent is busy', () => {
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
    it('should have tests');
  });
});
