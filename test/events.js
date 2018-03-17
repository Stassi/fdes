const { expect } = require('chai');
const { events } = require('../src/components/events');

const [name, oneMinute] = ['arrival', 60000];
const [eventOne, eventTwo, eventThree] = [
  { name, time: oneMinute },
  { name, time: oneMinute * 10 },
  { name, time: oneMinute * 100 },
];

describe('events', () => {
  const { schedule } = events();

  describe('#schedule', () => {
    it('should transform queue to include a schedule event', () => {
      const { queue } = schedule(eventOne)
        .status();
      expect(queue).to.include(eventOne);
    });

    it('should transform queue to return scheduled events sorted by time ascending', () => {
      const { queue } = schedule(eventThree)
        .schedule(eventOne)
        .schedule(eventTwo)
        .status();

      expect(queue).to.include.ordered.members([
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
    const { current, queue } = schedule(eventOne)
      .doNext()
      .status();

    it('should transfer processed event to property: current', () => {
      expect(current).to.equal(eventOne);
    });

    it('should not include the processed event in property: queue', () => {
      expect(queue).to.not.include(eventOne);
    });
  });
});
