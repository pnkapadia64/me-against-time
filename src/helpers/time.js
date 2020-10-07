import { TIMER_OFFSET, TIMER_BASE } from '../constants';

// timerValue from state (as per the base)
export const getTimeTakenInMs = (timerValue) => {
  return (TIMER_OFFSET - timerValue) / TIMER_BASE;
};
