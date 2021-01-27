import {Observable} from './Observable';

export class TicTacToe extends Observable {
  public grid: any;
  public currentPlayer: number;
  private observableObject: Observable;
  protected tour: number;
  constructor() {
    super();
    this.observableObject = new Observable();
    this.grid = new Array(3);
    this.currentPlayer = 0;
    this.tour = 0;
    this.initEvent();
    this.reset();
  }

  initEvent(): void {
    console.log('initEvent');

    for (let i = 0; i < 3; ++i) {
      this.grid[i] = Array(3);
    }

    this.observableObject.on('reset', (): void => {
      for (let i = 0; i < 3; ++i) {
        for (let j = 0; j < 3; ++j) {
          this.grid[i][j] = undefined;
        }
      }
      this.tour = 0;
      this.currentPlayer = 0;
      console.log('reset');
    });

    this.observableObject.on('play', (x: number, y: number): void => {
      if (this.getCaseState(x, y) === undefined && !this.isFinished() && this.tour !== 9) {
        this.tour++;
        this.grid[x][y] = this.currentPlayer;
        this.currentPlayer = this.getCurrentPlayer();
      }
    });

    this.observableObject.on('getCurrentPlayer', (): number => {
      return this.tour % 2;
    });

    this.observableObject.on('getCaseState', (x: number, y: number): number => {
      return this.grid[x][y];
    });

    this.observableObject.on('isFinished', (): boolean => {
      console.log('isFinished');
      return false;
    });

    this.observableObject.on('hasWinner', (): boolean => {
      console.log('hasWinner');
      return false;
    });

    this.observableObject.on('getWinner', (): number => {
      console.log('getWinner');
      return 0;
    });
  }

  reset(): void {
    this.observableObject.trigger('reset');
  }

  play(x: number, y: number): void {
    this.observableObject.trigger('play', x, y);
  }

  getCurrentPlayer(): number {
    return this.observableObject.trigger('getCurrentPlayer');
  }

  getCaseState(x: number, y: number): number {
    return this.observableObject.trigger('getCaseState', x, y);
  }

  isFinished(): boolean {
    return this.observableObject.trigger('isFinished');
  }

  hasWinner(): boolean {
    return this.observableObject.trigger('hasWinner');
  }

  getWinner(): number {
    return this.observableObject.trigger('getWinner');
  }
}
