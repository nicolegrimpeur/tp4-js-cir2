import {Observable} from './Observable';

export class TicTacToe extends Observable{
  constructor() {
    super();
  }

  play(x, y): void {
    console.log(x, y);
  }
}
