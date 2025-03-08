import { makeAutoObservable } from 'mobx';
import { Ghost } from './Ghost';
import { makeGhosts, resetGhosts } from './makeGhosts';
import { Maze } from './Maze';
import { PacMan, resetPacMan } from './PacMan';
import { MilliSeconds, PixelsPerFrame } from './Types';
import { Store } from './Store';
import { TimeoutTimer } from './TimeoutTimer';

export const DEFAULT_SPEED = 2;

const ENERGIZER_DURATION: MilliSeconds = 5000;

export class Game {
  store: Store;
  externalTimeStamp: MilliSeconds | null = null;
  timestamp: MilliSeconds = 0;
  lastFrameLength: MilliSeconds = 17;
  frameCount = 0;
  gamePaused = false;
  speed: PixelsPerFrame = DEFAULT_SPEED;
  ghosts: Ghost[];
  pacMan: PacMan;
  score = 0;
  killedGhosts = 0;
  maze = new Maze();

  constructor(store: Store) {
    this.store = store;
    this.pacMan = new PacMan(this);
    this.ghosts = makeGhosts(this);
    makeAutoObservable(this, {
      store: false,
      speed: true,
      ghosts: true,
      pacMan: true,
      maze: true
    });
  }

  revivePacMan = () => {
    this.pacMan.send({ type: 'REVIVED' });
    this.timestamp = 0;
    resetPacMan(this.pacMan);
    resetGhosts(this.ghosts);
  };

  get gameOver(): boolean {
    const pacMan = this.pacMan;
    return pacMan.dead && pacMan.extraLivesLeft === 0;
  }

  energizerTimer = new TimeoutTimer(ENERGIZER_DURATION, () => {
    this.handleEnergizerTimedOut();
  });

  handleEnergizerTimedOut = () => {
    this.pacMan.send({ type: 'ENERGIZER_TIMED_OUT' });
    for (const ghost of this.ghosts) {
      ghost.send({ type: 'ENERGIZER_TIMED_OUT' });
    }
  };

  readyGameForPlay() {
    resetPacMan(this.pacMan);
  }
}
