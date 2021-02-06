import {Component, OnInit} from '@angular/core';
import {theme} from '../../theme';

@Component({
  selector: 'app-titre, Titre',
  templateUrl: './titre.component.html',
  styleUrls: ['./titre.component.scss']
})
export class TitreComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    this.modifTitre();
  }

  // change le titre du jeu en fonction du thème
  modifTitre(): void {
    const currentDiv = document.getElementById('titre');

    switch (theme) {
      case ('anneau'):
        currentDiv.textContent = 'The Lord Of The Ring';
        break;
      case ('harry'):
        currentDiv.textContent = 'Har¡y VS Draco';
        break;
      default:
        currentDiv.textContent = 'Spyro\'s Adventure';
        break;
    }
  }
}
