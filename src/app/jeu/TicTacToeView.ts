import {TicTacToe} from './TicTacToe';
import {theme} from '../../theme';

/* classe gérant le côté visuel du jeu */
export class TicTacToeView {
  private readonly game: TicTacToe;
  private readonly name: any;
  private gentil: string;
  private mechant: string;

  constructor(game, name) {
    this.game = game;
    this.name = name;
    this.initPersos();
    this.nomJoueur();
  }

  // initialise les noms des gentils et des méchants
  initPersos(): void {
    switch (theme) {
      case ('anneau'):
        this.gentil = 'Frodon';
        this.mechant = 'Sauron';
        break;
      case ('harry'):
        this.gentil = 'Har¡y';
        this.mechant = 'Draco';
        break;
      default:
        this.gentil = 'Spyro';
        this.mechant = 'Ripto';
        break;
    }
  }

  // lorsque l'on clique sur l'une des cases du tableau
  clickEvent(x, y): void {
    // place le pion
    this.game.play(x, y);

    // affiche soit le joueur a qui le tour est, soit le joueur ayant gagné
    this.game.isFinished() ? this.affichageGagnant() : this.nomJoueur();
  }

  // affiche le nom du joueur qui peut jouer
  nomJoueur(): void {
    if (this.game.getCurrentPlayer() === 0) {
      document.getElementById('playerNumber').firstChild.textContent = 'C\'est au joueur ' + this.gentil + ' ';
    } else {
      document.getElementById('playerNumber').firstChild.textContent = 'C\'est au joueur ' + this.mechant + ' ';
    }
  }

  // affiche le gagnant ou s'il y a égalité
  affichageGagnant(): void {
    // test si l'on a un vainqueur ou non
    if (this.game.hasWinner() !== undefined) {
      // affiche le joueur qui a gagné
      if (!this.game.getWinner()) {
        document.getElementById('playerNumber').firstChild.textContent = this.gentil + ' a gagné !';
      } else {
        document.getElementById('playerNumber').firstChild.textContent = this.mechant + ' a gagné !';
      }
    } else {
      document.getElementById('playerNumber').firstChild.textContent = 'Il y a égalité !';
    }
  }

  // permet en fonction de la case de renvoyer quel joueur est sur la case, ou alors s'il n'y a aucun joueur dessus
  checkClass(x: number, y: number): string {
    switch (this.game.grid[x][y]) {
      case(0):
        return 'gentil';
      case(1):
        return 'mechant';
      default:
        return '';
    }
  }
}
