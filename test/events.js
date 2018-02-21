const { expect } = require('chai');
const { events } = require('../src/events');

describe('events', () => {
  const { create } = events();

  const [event, oneMinute] = ['arrival', 60000];
  const [eventOne, eventTwo, eventThree] = [
    { event, time: oneMinute },
    { event, time: oneMinute * 10 },
    { event, time: oneMinute * 100 },
  ];

  describe('#queue', () => {
    const { queue } = events();
    it('should be an Array', () => {
      expect(queue()).to.be.an('Array');
    });
  });

  describe('#create', () => {
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
    const { doNext } = create(eventOne)
      .create(eventTwo);

    it('should call the provided function with the first queued event', done => {
      doNext(event => event === eventOne ? done() : null);
    });

    it('should transform #queue to return queued elements after the first', () => {
      const { queue } = doNext(() => null);
      expect(queue()).to.include(eventTwo);
    });
  });
});
