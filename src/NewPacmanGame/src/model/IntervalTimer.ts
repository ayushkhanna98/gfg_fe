import { MilliSeconds } from './Types';
import { makeAutoObservable } from 'mobx';

export type TimerCallback = () => void;

export class IntervalTimer {
  duration: MilliSeconds;
  readonly onTimedOut: TimerCallback | null;
  running = false;
  timeSpent = 0;

  constructor(duration: MilliSeconds, onTimedOut: TimerCallback | null = null) {
    this.duration = duration;
    this.onTimedOut = onTimedOut;
    makeAutoObservable(this, {
      onTimedOut: false,
      duration: true
    });
  }

  setDuration = (duration: MilliSeconds) => {
    this.duration = duration;
  };

  start = () => {
    this.running = true;
    this.timeSpent = 0;
  };

  advance = (timePassed: MilliSeconds) => {
    if (!this.running) {
      return;
    }
    this.timeSpent += timePassed;
    if (this.isTimedOut) {
      this.onTimedOut?.();
      this.timeSpent = 0;
    }
  };

  stop = () => {
    this.running = false;
  };

  restart = () => {
    this.stop();
    this.start();
  };

  get timeLeft() {
    return this.duration - this.timeSpent;
  }

  get isTimedOut() {
    return this.timeSpent >= this.duration;
  }
}
