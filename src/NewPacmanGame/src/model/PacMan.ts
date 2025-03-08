import { makeAutoObservable } from 'mobx';
import { Direction, MilliSeconds } from './Types';
import {
  tileFromScreen,
  screenFromTile,
  TileCoordinates,
  ScreenCoordinates,
  assertValidTileCoordinates,
} from './Coordinates';
import {
  makePacManStateChart,
  PacManEventType,
  INITIAL_PACMAN_STATE,
  PacManState,
} from './PacManStateChart';
import { Game } from './Game';
import { StateValue } from 'xstate';

export class PacMan {
  game: Game;
  stateChart;
  stateChartState: PacManState;
  screenCoordinates: ScreenCoordinates = screenFromTile({ x: 1, y: 1 });
  diedAtTimestamp: MilliSeconds = -1;
  extraLivesLeft = 2;
  direction: Direction = 'RIGHT';
  nextDirection: Direction = 'RIGHT';

  constructor(game: Game) {
    this.game = game;
    this.stateChart = makePacManStateChart({
      onChasing: this.onChasing,
      onDead: this.onDead,
    });
    this.stateChartState = this.stateChart.getSnapshot();

    makeAutoObservable(this, {
      game: false,
      stateChart: false,
      nextDirection: true
    });

    this.stateChart.subscribe(this.handleTransition);
    this.stateChart.start();
  }

  handleTransition = (state: PacManState) => {
    if (state.value === this.stateChartState?.value) {
      return;
    }
    this.stateChartState = state;
  };

  onChasing = () => {
    this.game.energizerTimer.start();
  };

  onDead = () => {
    this.diedAtTimestamp = this.game.timestamp;
  };

  get dead(): boolean {
    return this.stateChartState.matches('dead');
  }

  get state(): StateValue {
    return this.stateChartState.value;
  }

  send(event: PacManEventType) {
    this.stateChart.send(event);
  }

  get alive() {
    return !this.dead;
  }

  setTileCoordinates = (tile: TileCoordinates) => {
    assertValidTileCoordinates(tile);
    this.screenCoordinates = screenFromTile(tile);
  };

  get tileCoordinates(): TileCoordinates {
    return tileFromScreen(this.screenCoordinates);
  }

  get timeSinceDeath(): MilliSeconds {
    if (this.alive) {
      return 0;
    }
    return this.game.timestamp - this.diedAtTimestamp;
  }
}

export const resetPacMan = (pacMan: PacMan) => {
  pacMan.diedAtTimestamp = -1;
  pacMan.stateChart.getSnapshot().value = INITIAL_PACMAN_STATE;
  pacMan.setTileCoordinates({ x: 14, y: 23 });
  pacMan.nextDirection = 'LEFT';
  pacMan.direction = 'LEFT';
};
