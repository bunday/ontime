import { memo, useCallback, useEffect, useState } from 'react';
import { Tooltip } from '@chakra-ui/react';
import { IoCaretDown } from '@react-icons/all-files/io5/IoCaretDown';
import { IoCaretUp } from '@react-icons/all-files/io5/IoCaretUp';
import { IoOptions } from '@react-icons/all-files/io5/IoOptions';
import { IoPeople } from '@react-icons/all-files/io5/IoPeople';
import { IoPlay } from '@react-icons/all-files/io5/IoPlay';
import { IoPlayForward } from '@react-icons/all-files/io5/IoPlayForward';
import { IoPlaySkipForward } from '@react-icons/all-files/io5/IoPlaySkipForward';
import { IoStop } from '@react-icons/all-files/io5/IoStop';
import { IoTime } from '@react-icons/all-files/io5/IoTime';
import { EndAction, Playback, TimerType } from 'ontime-types';

import TooltipActionBtn from '../../../common/components/buttons/TooltipActionBtn';
import { useEventEditorStore } from '../../../common/stores/eventEditor';
import { tooltipDelayMid } from '../../../ontimeConfig';
import EditableBlockTitle from '../common/EditableBlockTitle';
import { EventItemActions } from '../RundownEntry';

import BlockActionMenu from './composite/BlockActionMenu';
import EventBlockPlayback from './composite/EventBlockPlayback';
import EventBlockProgressBar from './composite/EventBlockProgressBar';
import EventBlockTimers from './composite/EventBlockTimers';

import style from './EventBlock.module.scss';

const blockBtnStyle = {
  size: 'sm',
};

const tooltipProps = {
  openDelay: tooltipDelayMid,
};

interface EventBlockInnerProps {
  isOpen: boolean;
  timeStart: number;
  timeEnd: number;
  duration: number;
  eventId: string;
  isPublic: boolean;
  endAction: EndAction;
  timerType: TimerType;
  title: string;
  note: string;
  delay: number;
  previousEnd: number;
  next: boolean;
  skip: boolean;
  selected: boolean;
  playback?: Playback;
  actionHandler: (action: EventItemActions, payload?: any) => void;
}

const EventBlockInner = (props: EventBlockInnerProps) => {
  const {
    isOpen,
    timeStart,
    timeEnd,
    duration,
    eventId,
    isPublic = true,
    endAction,
    timerType,
    title,
    note,
    delay,
    previousEnd,
    next,
    skip = false,
    selected,
    playback,
    actionHandler,
  } = props;

  const [renderInner, setRenderInner] = useState(false);
  const setOpenEvent = useEventEditorStore((state) => state.setOpenEvent);
  const removeOpenEvent = useEventEditorStore((state) => state.removeOpenEvent);

  useEffect(() => {
    setRenderInner(true);
  }, []);

  const toggleOpenEvent = useCallback(() => {
    if (isOpen) {
      removeOpenEvent();
    } else {
      setOpenEvent(eventId);
    }
  }, [eventId, isOpen, removeOpenEvent, setOpenEvent]);

  const eventIsPlaying = selected && playback === Playback.Play;
  const playBtnStyles = { _hover: {} };
  if (!skip && eventIsPlaying) {
    playBtnStyles._hover = { bg: '#c05621' };
  } else if (!skip && !eventIsPlaying) {
    playBtnStyles._hover = {};
  }

  return !renderInner ? null : (
    <>
      <EventBlockPlayback eventId={eventId} skip={skip} isPlaying={eventIsPlaying} selected={selected} />
      <EventBlockTimers
        eventId={eventId}
        timeStart={timeStart}
        timeEnd={timeEnd}
        duration={duration}
        delay={delay}
        previousEnd={previousEnd}
      />
      <EditableBlockTitle title={title} eventId={eventId} placeholder='Event title' className={style.eventTitle} />
      <div className={style.statusElements}>
        <span className={style.eventNote}>{note}</span>
        <div className={selected ? style.progressBg : `${style.progressBg} ${style.hidden}`}>
          {selected && <EventBlockProgressBar playback={playback} />}
        </div>
        <div className={style.eventStatus} tabIndex={-1}>
          {next && (
            <Tooltip label='Next event' {...tooltipProps}>
              <span className={style.tag}>NEXT</span>
            </Tooltip>
          )}
          <Tooltip label={`Time type: ${timerType}`} {...tooltipProps}>
            <span>
              <TimerIcon type={timerType} className={style.statusIcon} />
            </span>
          </Tooltip>
          <Tooltip label={`End action: ${endAction}`} {...tooltipProps}>
            <span>
              <EndActionIcon action={endAction} className={style.statusIcon} />
            </span>
          </Tooltip>
          <Tooltip label={`${isPublic ? 'Event is public' : 'Event is private'}`} {...tooltipProps}>
            <span>
              <IoPeople className={`${style.statusIcon} ${isPublic ? style.active : style.disabled}`} />
            </span>
          </Tooltip>
        </div>
      </div>
      <div className={style.eventActions}>
        <TooltipActionBtn
          {...blockBtnStyle}
          variant='ontime-subtle-white'
          size='sm'
          icon={<IoOptions />}
          clickHandler={toggleOpenEvent}
          tooltip='Event options'
          aria-label='Event options'
          tabIndex={-1}
          backgroundColor={isOpen ? '#2B5ABC' : undefined}
          color={isOpen ? 'white' : '#f6f6f6'}
        />
        <BlockActionMenu showAdd showDelay showBlock showClone enableDelete={!selected} actionHandler={actionHandler} />
      </div>
    </>
  );
};

export default memo(EventBlockInner);

function EndActionIcon(props: { action: EndAction; className: string }) {
  const { action, className } = props;
  if (action === EndAction.LoadNext) {
    return <IoPlaySkipForward className={className} />;
  }
  if (action === EndAction.PlayNext) {
    return <IoPlayForward className={className} />;
  }
  if (action === EndAction.Stop) {
    return <IoStop className={className} />;
  }
  return <IoPlay className={className} />;
}

function TimerIcon(props: { type: TimerType; className: string }) {
  const { type, className } = props;
  if (type === TimerType.CountUp) {
    return <IoCaretUp className={className} />;
  }
  if (type === TimerType.Clock) {
    return <IoTime className={className} />;
  }
  return <IoCaretDown className={className} />;
}
