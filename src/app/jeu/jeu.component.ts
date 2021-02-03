import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TicTacToeView} from './TicTacToeView';
import {TicTacToe} from './TicTacToe';


@Component({
  selector: 'app-jeu',
  templateUrl: './jeu.component.html',
  styleUrls: ['./jeu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class JeuComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {
    console.log(document.getElementById('morpion'));
    const game = new TicTacToe();

    const view = new TicTacToeView(game, 'LetsGo', document);

  }

  mesTests(): void {
    const jeu = new TicTacToe();
    jeu.play(1, 1);
    console.log(jeu.getCaseState(1, 1));
  }
}
