import { makeAutoObservable } from 'mobx';
import { Store } from './Store';
import { GhostViewOptions } from './GhostViewOptions';
import { PacManViewOptions } from '../pages/GamePage/components/PacManViewOptions';
import { GameViewOptions } from './GameViewOptions';

export class DebugState {
  store: Store;
  gameViewOptions: GameViewOptions = {
    hitBox: false,
  };
  ghostViewOptions: GhostViewOptions = {
    target: false,
    wayPoints: false,
  };
  pacManViewOptions: PacManViewOptions = {
    somePlaceholder: false,
  };

  constructor(store: Store) {
    this.store = store;
    makeAutoObservable(this, {
      store: false
    });
  }
}
