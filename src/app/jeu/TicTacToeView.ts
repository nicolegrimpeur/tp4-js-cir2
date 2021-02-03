export class TicTacToeView {
  public game: any;
  private name: any;
  private doc: any;
  private readonly table: any;
  private readonly gentil: string;
  private readonly mechant: string;

  constructor(game, name, tab) {
    this.game = game;
    this.name = name;
    this.doc = tab;
    this.table = this.doc.getElementById('morpion');
    this.gentil = 'Spyro';
    this.mechant = 'Ripto';
    // this.createListeners();
    this.nomJoueur();
  }

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

  // lorsque l'on clique sur l'une des cases du tableau
  clickEvent(x, y): void {
    // place le pion
    this.game.play(x, y);

    // affiche les pions
    // this.pions();
    // affiche le bouton reset
    // this.boutonReset();

    // si la partie est fini
    if (this.game.hasWinner() || this.game.tour === 9) {
      this.affichageGagnant();
    } else {
      this.nomJoueur();
    }
  }

  // affiche les pions
  pions(): void {
    let compteur = 0;
    for (const row of this.table.rows) {
      for (const cell of row.cells) {
        cell.removeAttribute('class');

        switch (this.game.grid[Math.floor(compteur / 3)][compteur % 3]) {
          case (0):
            cell.setAttribute('class', 'gentil');
            break;
          case (1):
            cell.setAttribute('class', 'mechant');
            break;
        }
        // if (this.game.grid[Math.floor(compteur / 3)][compteur % 3] !== undefined) {
        //   if (this.game.grid[Math.floor(compteur / 3)][compteur % 3]) {
        //     cell.setAttribute('class', 'mechant');
        //   } else {
        //     cell.setAttribute('class', 'gentil');
        //   }
        // }
        compteur++;
      }
    }
  }

  // affiche le nom du joueur qui peut jouer
  nomJoueur(): void {
    if (this.game.currentPlayer === 0) {
      this.doc.getElementById('playerNumber').firstChild.textContent = 'C\'est au joueur ' + this.gentil + ' ';
    } else {
      this.doc.getElementById('playerNumber').firstChild.textContent = 'C\'est au joueur ' + this.mechant + ' ';
    }
  }

  // affiche le gagnant ou s'il y a égalité
  affichageGagnant(): void {
    if (this.game.hasWinner()) {
      // affiche le joueur qui a gagné
      if (!this.game.getWinner()) {
        this.doc.getElementById('playerNumber').firstChild.textContent = this.gentil + ' a gagné !';
      } else if (this.game.getWinner()) {
        this.doc.getElementById('playerNumber').firstChild.textContent = this.mechant + ' a gagné !';
      }
    } else {
      // supprime l'image qui indique à qui le tour est
      // if (document.getElementsByClassName('mini_persos')[0] !== undefined) {
      //   document.getElementsByClassName('mini_persos')[0].remove();
      // }
      this.doc.getElementById('playerNumber').firstChild.textContent = 'Il y a égalité !';
      // this.egalite = true;
      // this.doc.getElementsByClassName('miniPerso')[0].setAttribute('class', 'miniPerso');
    }
  }
}
