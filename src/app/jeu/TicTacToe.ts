import {Observable} from './Observable';

/* classe gérant le fonctionnement global du jeu */
export class TicTacToe extends Observable {
  public readonly grid: number[][];
  // en public pour que les tests y aient accès
  public currentPlayer: number;
  private observableObject: Observable;
  private tour: number;

  constructor() {
    super();
    this.observableObject = new Observable();
    this.grid = new Array(3);
    this.currentPlayer = 0;
    this.tour = 0;
    this.initEvent();
    this.reset();
  }

  // initialise les événements nécessaires au bon déroulement du jeu dans observableObject
  initEvent(): void {
    for (let i = 0; i < 3; ++i) {
      this.grid[i] = new Array(3);
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
      if (this.getCaseState(x, y) === undefined && !this.isFinished()) {
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

      // test si égalité à la fin du jeu
      return (this.tour === 9) ? undefined : false;
    });

    this.observableObject.on('hasWinner', (): boolean => {
      return (this.isFinished() === undefined) ? false : this.isFinished();
    });

    this.observableObject.on('getWinner', (): number => {
      return (this.isFinished() === undefined) ? undefined : Number(!this.getCurrentPlayer());
    });
  }

  // reset la partie
  reset(): void {
    this.observableObject.trigger('reset');
  }

  // joue le pion à la case x, y
  play(x: number, y: number): void {
    this.observableObject.trigger('play', x, y);
  }

  // retourne le player qui doit jouer
  getCurrentPlayer(): number {
    return this.observableObject.trigger('getCurrentPlayer');
  }

  // retourne l'état d'une case
  getCaseState(x: number, y: number): number {
    return this.observableObject.trigger('getCaseState', x, y);
  }

  // retourne le tour actuel
  getTour(): number {
    return this.observableObject.trigger('getTour');
  }

  // return si le jeu est terminé ou non, undefined si égalité
  isFinished(): boolean {
    return this.observableObject.trigger('isFinished');
  }

  // retourne s'il y a un gagnant ou non
  hasWinner(): boolean {
    return this.observableObject.trigger('hasWinner');
  }

  // retourne le gagnant
  getWinner(): number {
    return this.observableObject.trigger('getWinner');
  }
}
