import { EndAction, OntimeRundown, SupportedEvent, TimerType } from 'ontime-types';
import { _applyDelay } from '../RundownService.js';

describe('applyDelay()', () => {
  it('applies its duration to following events', () => {
    const rundown: OntimeRundown = [
      {
        title: '',
        subtitle: '',
        presenter: '',
        note: '',
        endAction: EndAction.None,
        timerType: TimerType.CountDown,
        timeStart: 600000,
        timeEnd: 1200000,
        duration: 600000,
        isPublic: true,
        skip: false,
        colour: '',
        user0: '',
        user1: '',
        user2: '',
        user3: '',
        user4: '',
        user5: '',
        user6: '',
        user7: '',
        user8: '',
        user9: '',
        type: SupportedEvent.Event,
        revision: 4,
        id: '659e1',
      },
      {
        duration: 600000,
        type: SupportedEvent.Delay,
        revision: 0,
        id: '07986',
      },
      {
        title: '',
        subtitle: '',
        presenter: '',
        note: '',
        endAction: EndAction.None,
        timerType: TimerType.CountDown,
        timeStart: 600000,
        timeEnd: 1200000,
        duration: 600000,
        isPublic: true,
        skip: false,
        colour: '',
        user0: '',
        user1: '',
        user2: '',
        user3: '',
        user4: '',
        user5: '',
        user6: '',
        user7: '',
        user8: '',
        user9: '',
        type: SupportedEvent.Event,
        revision: 4,
        id: 'd48c2',
      },
    ];

    const eventId = rundown[1].id;
    const { delayIndex, updatedRundown } = _applyDelay(eventId, rundown);

    expect(delayIndex).toBe(1);
    // we do not delay delays anymore
    expect(updatedRundown.length).toBe(3);
    expect(rundown.length).toBe(3);
    expect(updatedRundown[0].timeStart).toBe(rundown[0].timeStart);
    expect(updatedRundown[2].timeStart).toBe(rundown[1].duration + rundown[2].timeStart);
    expect(updatedRundown[2].timeEnd).toBe(rundown[1].duration + rundown[2].timeEnd);
  });
  it('stops propagating on blocks', () => {
    const rundown: OntimeRundown = [
      {
        title: '',
        subtitle: '',
        presenter: '',
        note: '',
        endAction: EndAction.None,
        timerType: TimerType.CountDown,
        timeStart: 600000,
        timeEnd: 1200000,
        duration: 600000,
        isPublic: true,
        skip: false,
        colour: '',
        user0: '',
        user1: '',
        user2: '',
        user3: '',
        user4: '',
        user5: '',
        user6: '',
        user7: '',
        user8: '',
        user9: '',
        type: SupportedEvent.Event,
        revision: 0,
        id: '659e1',
      },
      {
        duration: 600000,
        type: SupportedEvent.Delay,
        revision: 0,
        id: '07986',
      },
      {
        title: '',
        subtitle: '',
        presenter: '',
        note: '',
        endAction: EndAction.None,
        timerType: TimerType.CountDown,
        timeStart: 600000,
        timeEnd: 1200000,
        duration: 600000,
        isPublic: true,
        skip: false,
        colour: '',
        user0: '',
        user1: '',
        user2: '',
        user3: '',
        user4: '',
        user5: '',
        user6: '',
        user7: '',
        user8: '',
        user9: '',
        type: SupportedEvent.Event,
        revision: 0,
        id: 'd48c2',
      },
      {
        title: '',
        type: SupportedEvent.Block,
        id: '9870d',
      },
      {
        title: '',
        subtitle: '',
        presenter: '',
        note: '',
        endAction: EndAction.None,
        timerType: TimerType.CountDown,
        timeStart: 1200000,
        timeEnd: 1800000,
        duration: 600000,
        isPublic: true,
        skip: false,
        colour: '',
        user0: '',
        user1: '',
        user2: '',
        user3: '',
        user4: '',
        user5: '',
        user6: '',
        user7: '',
        user8: '',
        user9: '',
        type: SupportedEvent.Event,
        revision: 2,
        id: '2f185',
      },
    ];

    const eventId = rundown[1].id;
    const { updatedRundown } = _applyDelay(eventId, rundown);

    expect(updatedRundown[0].timeStart).toBe(rundown[0].timeStart);
    expect(updatedRundown[2].timeStart).toBe(rundown[1].duration + rundown[2].timeStart);
    expect(updatedRundown[4].timeStart).toBe(rundown[4].timeStart);
  });
  it('only applies given delay', () => {
    const rundown: OntimeRundown = [
      {
        title: '',
        subtitle: '',
        presenter: '',
        note: '',
        endAction: EndAction.None,
        timerType: TimerType.CountDown,
        timeStart: 600000,
        timeEnd: 1200000,
        duration: 600000,
        isPublic: true,
        skip: false,
        colour: '',
        user0: '',
        user1: '',
        user2: '',
        user3: '',
        user4: '',
        user5: '',
        user6: '',
        user7: '',
        user8: '',
        user9: '',
        type: SupportedEvent.Event,
        revision: 0,
        id: '659e1',
      },
      {
        duration: 600000,
        type: SupportedEvent.Delay,
        revision: 0,
        id: '07986',
      },
      {
        title: '',
        subtitle: '',
        presenter: '',
        note: '',
        endAction: EndAction.None,
        timerType: TimerType.CountDown,
        timeStart: 1200000,
        timeEnd: 1200000,
        duration: 0,
        isPublic: true,
        skip: false,
        colour: '',
        user0: '',
        user1: '',
        user2: '',
        user3: '',
        user4: '',
        user5: '',
        user6: '',
        user7: '',
        user8: '',
        user9: '',
        type: SupportedEvent.Event,
        revision: 0,
        id: '1c48f',
      },
      {
        duration: 1200000,
        type: SupportedEvent.Delay,
        revision: 0,
        id: '7db42',
      },
      {
        title: '',
        subtitle: '',
        presenter: '',
        note: '',
        endAction: EndAction.None,
        timerType: TimerType.CountDown,
        timeStart: 600000,
        timeEnd: 1200000,
        duration: 600000,
        isPublic: true,
        skip: false,
        colour: '',
        user0: '',
        user1: '',
        user2: '',
        user3: '',
        user4: '',
        user5: '',
        user6: '',
        user7: '',
        user8: '',
        user9: '',
        type: SupportedEvent.Event,
        revision: 0,
        id: 'd48c2',
      },
      {
        title: '',
        type: SupportedEvent.Block,
        id: '9870d',
      },
      {
        title: '',
        subtitle: '',
        presenter: '',
        note: '',
        endAction: EndAction.None,
        timerType: TimerType.CountDown,
        timeStart: 1200000,
        timeEnd: 1800000,
        duration: 600000,
        isPublic: true,
        skip: false,
        colour: '',
        user0: '',
        user1: '',
        user2: '',
        user3: '',
        user4: '',
        user5: '',
        user6: '',
        user7: '',
        user8: '',
        user9: '',
        type: SupportedEvent.Event,
        revision: 0,
        id: '2f185',
      },
    ];

    const eventId = rundown[1].id;
    const { updatedRundown } = _applyDelay(eventId, rundown);

    expect(updatedRundown[0].timeStart).toBe(rundown[0].timeStart);
    expect(updatedRundown[2].timeStart).toBe(rundown[1].duration + rundown[2].timeStart);
    expect(updatedRundown[4].timeStart).toBe(rundown[1].duration + rundown[4].timeStart);
  });
});
