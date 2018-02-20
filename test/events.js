const { expect } = require('chai');
const { events } = require('../src/events');

describe('events', () => {
  const event = 'arrival';
  const ONE_MINUTE = 60000;
  const [eventOne, eventTwo, eventThree] = [
    { event, time: ONE_MINUTE },
    { event, time: ONE_MINUTE * 10 },
    { event, time: ONE_MINUTE * 100 },
  ];

  describe('#queue', () => {
    const { queue } = events();
    it('should be an Array', () => {
      expect(queue()).to.be.an('Array');
    });
  });

  describe('#create', () => {
    const { create } = events();

    it('should transform #queue to include a created event', () => {
      const { queue } = create(eventOne);
      expect(queue()).to.include(eventOne);
    });

    it('should transform #queue to return created events sorted by time ascending', () => {
      const { queue } = create(eventThree)
        .create(eventOne)
        .create(eventTwo);

      expect(queue()).to.include.ordered.members([
        eventOne,
        eventTwo,
        eventThree,
      ]).but.not.include.ordered.members([
        eventThree,
        eventOne,
        eventTwo,
      ]);
    });
  });

  describe('#doNext', () => {
    const { create } = events();
    const { doNext } = create(eventOne)
      .create(eventTwo);

    it('should pass the next event to the provided function', done => {
      doNext(event => {
        if (event === eventOne) done();
      });
    });

    it('should transform #queue to return the remaining queued elements', () => {
      const { queue } = doNext(() => null);
      expect(queue()).to.include(eventTwo);
    });
  });
});
