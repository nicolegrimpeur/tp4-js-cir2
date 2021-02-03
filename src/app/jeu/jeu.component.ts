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
  public game: TicTacToe;
  public view: TicTacToeView;

  constructor() {
  }

  ngOnInit(): void {
    this.game = new TicTacToe();

    this.view = new TicTacToeView(this.game, 'LetsGo');
  }
}
