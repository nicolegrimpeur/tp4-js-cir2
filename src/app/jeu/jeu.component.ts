import {Component, OnInit} from '@angular/core';
import {TicTacToe} from './TicTacToe';
import {Observable} from './Observable';


@Component({
  selector: 'app-jeu',
  templateUrl: './jeu.component.html',
  styleUrls: ['./jeu.component.scss']
})
export class JeuComponent implements OnInit {

  constructor() {
    this.mesTests();
  }

  ngOnInit(): void {
  }

  mesTests(): void {
    const jeu = new TicTacToe();
    jeu.play(1, 1);
    console.log(jeu.getCaseState(1, 1));
  }
}
