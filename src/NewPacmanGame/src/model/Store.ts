import { makeAutoObservable } from 'mobx';
import { Game } from './Game';
import { DebugState } from './DebugState';

export class Store {
  game: Game;
  debugState: DebugState;

  constructor() {
    this.game = new Game(this);
    this.debugState = new DebugState(this);
    makeAutoObservable(this, {
      debugState: true
    });
  }

  resetGame = () => {
    this.game = new Game(this);
    this.game.readyGameForPlay();
  };
}
