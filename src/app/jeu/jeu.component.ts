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
    this.exercice1();
  }

  ngOnInit(): void {
  }

  exercice1(): void {
    const observableObject = new Observable();

    const winCallback = (player: string): string => {
      console.log('Player', player, 'win !');
      return 'Player' + player + 'win !';
    };

    observableObject.on('win', winCallback);
    observableObject.on('move', (player: string, x: number, y: number): string => {
      console.log('Player', player, 'is moving on (' + x + ',' + y + ')');
      return 'Player' + player + 'is moving on (' + x + ',' + y + ')';
    });

    console.log(observableObject);
    observableObject.off('win', winCallback);
    console.log(observableObject);
    observableObject.on('win', winCallback);
    console.log(observableObject);


    observableObject.trigger('win', 'Bob');
    observableObject.trigger('move', 'Alice', 2, 1);

    observableObject.off('win', winCallback);
    observableObject.trigger('win', 'Alice');
    observableObject.trigger('move', 'Bob', 1, 1);
  }
}
