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

    this.observableObject.on('getTour', (): number => {
      return this.tour;
    });

    this.observableObject.on('isFinished', (): boolean => {
      for (let i = 0; i < 3; ++i) {
        // test colonnes
        if (this.grid[i][0] === this.grid[i][1] && this.grid[i][1] === this.grid[i][2] && this.grid[i][0] !== undefined) {
          return true;
        }

        // test lignes
        if (this.grid[0][i] === this.grid[1][i] && this.grid[1][i] === this.grid[2][i] && this.grid[0][i] !== undefined) {
          return true;
        }
      }

      // test diagonales
      if (this.grid[0][0] === this.grid[1][1] && this.grid[1][1] === this.grid[2][2] && this.grid[0][0] !== undefined) {
        return true;
      }
      if (this.grid[0][2] === this.grid[1][1] && this.grid[1][1] === this.grid[2][0] && this.grid[0][2] !== undefined) {
        return true;
      }

      // test si égalite à la fin du jeu
      return this.tour === 9;
    });

    this.observableObject.on('hasWinner', (): boolean => {
      if (this.isFinished() && this.tour === 9) {
        return false;
      }
      return this.isFinished();
    });

    this.observableObject.on('getWinner', (): number => {
      if (this.tour === 9) {
        return undefined;
      }
      return Number(!this.currentPlayer);
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

  getTour(): number {
    return this.observableObject.trigger('getTour');
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
