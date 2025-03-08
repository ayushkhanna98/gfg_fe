import { makeAutoObservable } from 'mobx';
import { getPillsMatrix, TileId } from './MazeData';

export class Maze {
  pills: TileId[][] = getPillsMatrix();

  constructor() {
    makeAutoObservable(this);
  }
}
