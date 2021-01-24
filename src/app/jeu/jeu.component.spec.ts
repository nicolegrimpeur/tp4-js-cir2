import {JeuComponent} from './jeu.component';
import {TicTacToe} from './TicTacToe';
import {Observable} from './Observable';

describe('JeuComponent', () => {
  it('should create', () => {
    expect(JeuComponent).toBeTruthy();
  });
});

describe('Tests unitaires Exercice 1', () => {
  it('should work', () => {
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

    observableObject.off('win', winCallback);
    observableObject.on('win', winCallback);

    expect(observableObject.trigger('win', 'Bob')).toEqual('PlayerBobwin !');
    expect(observableObject.trigger('move', 'Alice', 2, 1)).toEqual('PlayerAliceis moving on (2,1)');

    observableObject.off('win', winCallback);
    expect(observableObject.trigger('win', 'Alice')).toEqual(-1);
    expect(observableObject.trigger('move', 'Bob', 1, 1)).toEqual('PlayerBobis moving on (1,1)');
  });
});

/*
describe('Tests unitaires Exercice 2', () => {
  it('should create', () => {
    expect(JeuComponent).toBeTruthy();
  });

  it('TicTacToe prototype - method existance', () => {
    expect(typeof TicTacToe.prototype.play).toEqual('function');
    expect(typeof TicTacToe.prototype.reset).toEqual('function');
    expect(typeof TicTacToe.prototype.getCurrentPlayer).toEqual('function');
    expect(typeof TicTacToe.prototype.getCaseState).toEqual('function');
    expect(typeof TicTacToe.prototype.isFinished).toEqual('function');
    expect(typeof TicTacToe.prototype.hasWinner).toEqual('function');
    expect(typeof TicTacToe.prototype.getWinner).toEqual('function');
  });

  it('TicTacToe inherit from Observable', () => {
    expect(TicTacToe.prototype instanceof Observable).toBeTruthy();
    expect(TicTacToe.prototype.constructor).toEqual(TicTacToe);
  });

  it('TicTacToe constructor', () => {
    const game = new TicTacToe();
    const observable = new Observable();

    expect(Object.keys(observable).every(key => game[key])).toBeTruthy();
    expect(game.currentPlayer).toEqual(0);
    expect(Array.isArray(game.grid)).toBeTruthy();
    expect(game.grid.length).toEqual(3);
    for (let line = 0; line < 3; ++line) {
      expect(Array.isArray(game.grid[line])).toBeTruthy();
      expect(game.grid[line].length).toEqual(3);
    }
  });

  it('TicTacToe play - player id', () => {
    const game = new TicTacToe();

    expect(0).toEqual(game.currentPlayer);
    game.play(0, 0);
    expect(1).toEqual(game.currentPlayer);
    game.play(0, 1);
    expect(0).toEqual(game.currentPlayer);
    game.play(0, 2);
    expect(1).toEqual(game.currentPlayer);
  });

  it('TicTacToe play - grid state', () => {
    const game = new TicTacToe();

    game.play(0, 0);
    expect(0).toEqual(game.grid[0][0]);
    game.play(0, 1);
    expect(1).toEqual(game.grid[0][1]);
    game.play(0, 2);
    expect(0).toEqual(game.grid[0][2]);
    game.play(1, 1);
    expect(1).toEqual(game.grid[1][1]);
    expect(undefined).toEqual(game.grid[1][0]);
    expect(undefined).toEqual(game.grid[1][2]);
    expect(undefined).toEqual(game.grid[2][0]);
    expect(undefined).toEqual(game.grid[2][1]);
    expect(undefined).toEqual(game.grid[2][2]);
  });

  it('TicTacToe getCurrentPlayer', () => {
    const game = new TicTacToe();

    expect(0).toEqual(game.getCurrentPlayer());
    game.play(0, 0);
    expect(1).toEqual(game.getCurrentPlayer());
    game.play(0, 1);
    expect(0).toEqual(game.getCurrentPlayer());
    game.play(0, 2);
    expect(1).toEqual(game.getCurrentPlayer());
  });

  it('TicTacToe getCaseState', () => {
    const game = new TicTacToe();

    game.play(0, 0);
    expect(0).toEqual(game.getCaseState(0, 0));
    game.play(0, 1);
    expect(1).toEqual(game.getCaseState(0, 1));
    game.play(0, 2);
    expect(0).toEqual(game.getCaseState(0, 2));
    game.play(1, 1);
    expect(1).toEqual(game.getCaseState(1, 1));
    expect(undefined).toEqual(game.getCaseState(1, 0));
    expect(undefined).toEqual(game.getCaseState(1, 2));
    expect(undefined).toEqual(game.getCaseState(2, 0));
    expect(undefined).toEqual(game.getCaseState(2, 1));
    expect(undefined).toEqual(game.getCaseState(2, 2));
  });

  it('TicTacToe reset', () => {
    const game = new TicTacToe();

    game.play(0, 0);
    game.play(0, 1);
    game.play(0, 2);
    game.play(1, 1);
    game.play(2, 2);
    game.reset();
    for (let x = 0; x < 3; ++x) {
      for (let y = 0; y < 3; ++y) {
        expect(game.getCaseState(x, y)).toEqual(undefined);
      }
    }
    expect(game.getCurrentPlayer()).toEqual(0);
  });

  it('TicTacToe win column', () => {
    const game = new TicTacToe();

    expect(!game.isFinished()).toBeTruthy();
    game.play(1, 1);
    game.play(0, 0);
    game.play(1, 2);
    game.play(2, 0);
    expect(!game.isFinished()).toBeTruthy();
    game.play(1, 0);
    expect(game.isFinished()).toBeTruthy();
    expect(game.hasWinner()).toBeTruthy();
    expect(game.getWinner()).toEqual(0);
  });

  it('TicTacToe win line', () => {
    const game = new TicTacToe();

    expect(!game.isFinished()).toBeTruthy();
    game.play(1, 1);
    game.play(0, 0);
    game.play(2, 1);
    game.play(2, 0);
    game.play(1, 2);
    expect(!game.isFinished()).toBeTruthy();
    game.play(1, 0);
    expect(game.isFinished()).toBeTruthy();
    expect(game.hasWinner()).toBeTruthy();
    expect(game.getWinner()).toEqual(1);
  });

  it('TicTacToe win diag', () => {
    const game = new TicTacToe();

    expect(!game.isFinished()).toBeTruthy();
    game.play(0, 0);
    game.play(0, 2);
    game.play(2, 2);
    game.play(1, 1);
    game.play(1, 2);
    expect(!game.isFinished()).toBeTruthy();
    game.play(2, 0);
    expect(game.isFinished()).toBeTruthy();
    expect(game.hasWinner()).toBeTruthy();
    expect(game.getWinner()).toEqual(1);
  });

  it('TicTacToe mate', () => {
    const game = new TicTacToe();

    expect(!game.isFinished()).toBeTruthy();
    game.play(1, 1);
    game.play(0, 0);
    game.play(0, 2);
    game.play(2, 0);
    game.play(1, 0);
    game.play(1, 2);
    game.play(0, 1);
    game.play(2, 1);
    expect(!game.isFinished()).toBeTruthy();
    game.play(2, 2);
    expect(game.isFinished()).toBeTruthy();
    expect(!game.hasWinner()).toBeTruthy();
    expect(game.getWinner()).toEqual(undefined);
  });
});
*/
