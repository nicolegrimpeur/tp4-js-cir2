export class TicTacToeView {
  private game: any;
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
    this.createListeners();
    this.nomJoueur();
  }

  // crée un listener par case du tableau
  createListeners(): void {
    for (let i = 0; i < 3; ++i) {
      for (let j = 0; j < 3; ++j) {
        this.table.rows[i].cells[j].addEventListener('click', () => {
          this.clickEvent(i, j);
        });
      }
    }
  }

  // lorsque l'on clique sur l'une des cases du tableau
  clickEvent(x, y): void {
    // place le pion
    this.game.play(x, y);

    // affiche les pions
    this.pions();
    // affiche le bouton reset
    this.boutonReset();

    // si la partie est fini
    if (this.game.hasWinner() || this.game.tour === 9) { this.affichageGagnant(); }

    // affiche le nom du joueur a qui est le tour
    if (!this.game.isFinished() && this.game.tour !== 9) { this.nomJoueur(); }
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
    // console.log(document.getElementById('playerNumber'));
    if (this.game.currentPlayer === 0) { document.getElementById('playerNumber').firstChild.textContent = 'C\'est au joueur ' + this.gentil + ' '; }
    else { document.getElementById('playerNumber').firstChild.textContent = 'C\'est au joueur ' + this.mechant + ' '; }
    this.blason();
  }

  // affiche l'image du joueur qui peut jouer
  blason(): void {
    console.log(this.doc.getElementsByClassName('miniPerso'));
    const currentDiv = this.doc.getElementsByClassName('miniPerso')[0];


    if (this.game.currentPlayer === 0) { currentDiv.setAttribute('class', 'miniPerso gentil'); }
    else { currentDiv.setAttribute('class', 'miniPerso mechant'); }


    // // supprime l'image existante
    // if (document.getElementsByClassName('mini_persos')[0] !== undefined) {
    //   document.getElementsByClassName('mini_persos')[0].remove();
    // }
    //
    // // affiche l'image
    // const currentDiv = document.getElementById('playerNumber');
    //
    // const img = document.createElement('img');
    // currentDiv.parentElement.appendChild(img);
    // img.setAttribute('class', 'mini_persos');
    //
    // // on définit quel est l'image que l'on doit afficher
    // if (this.game.currentPlayer === 0) { img.setAttribute('src', 'frodon.png'); }
    // else { img.setAttribute('src', 'sauron.png'); }
  }

  // affiche une image qui permet de relancer le jeu
  boutonReset(): void {
    // on affiche pas l'image si le jeu n'a pas commencé
    if ((this.game.isFinished() || this.game.tour !== 0) && document.getElementsByClassName('reset bouton').length === 0) {
      const currentDiv = document.getElementsByClassName('reset')[0];
      console.log('reset');
      currentDiv.setAttribute('class', 'reset bouton');

      currentDiv.addEventListener('click', () => {
        this.game.reset();
        currentDiv.setAttribute('class', 'reset');


        const miniPerso = this.doc.getElementById('playerNumber');

        const img = document.createElement('img');
        miniPerso.appendChild(img);
        img.setAttribute('src', 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
        img.setAttribute('alt', 'Image du joueur');
        img.setAttribute('class', 'miniPerso');


        this.pions();
        this.nomJoueur();
      });
    }
  }

  // affiche le gagnant ou s'il y a égalité
  affichageGagnant(): void {
    if (this.game.isFinished()) {
      // affiche le joueur qui a gagné
      if (!this.game.getWinner()) { this.doc.getElementById('playerNumber').firstChild.textContent = this.gentil + ' a gagné !'; }
      else if (this.game.getWinner()) { this.doc.getElementById('playerNumber').firstChild.textContent = this.mechant + ' a gagné !'; }
    }
    else {
      // supprime l'image qui indique à qui le tour est
      // if (document.getElementsByClassName('mini_persos')[0] !== undefined) {
      //   document.getElementsByClassName('mini_persos')[0].remove();
      // }
      this.doc.getElementById('playerNumber').textContent = 'Il y a égalité !';
    }
  }
}
