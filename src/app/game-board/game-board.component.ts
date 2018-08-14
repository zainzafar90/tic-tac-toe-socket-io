import { Component, OnInit, Input } from '@angular/core';
import { Cell } from '../types/cell';
import { Turn } from '../types/turn';
import { Mark } from '../types/mark';
import { GameResult } from '../types/game-result';
import { SeoService } from '../services/seo.service';
import { WebSocketService } from '../services/web-socket.service';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {

  @Input() room: string;
  /*
  *The board configuration in this state
  */
  grid: Cell[] = [];
  /*
 * The player who has the turn to player
 */
  turn: Turn = Turn.PLAYER_1;

  /*
 * Marks Selected by Players (CIRCLE or CROSS)
 */
  playerOneIcon = Mark.CIRCLE;
  playerTwoIcon = Mark.CROSS;

  /*
 * If ends either by win or by draw
 */
  gameEnded: boolean;
  gameResult: GameResult = GameResult.DRAW;

  constructor(
    private seo: SeoService,
    private wS: WebSocketService
  ) {
    this.initializeGameBoard();

    this.wS.turnPlayed().subscribe(response => {
      this.takeTurn(response.tile);
    });
  }

  ngOnInit() {
    this.seo.generateTags({
      title: 'Home - Tic Tac Toe'
    });
  }

  setCurrentTurn(turn) {
    const message = turn ? 'Your turn' : 'Waiting for Opponent';
    console.log(message);
  }

  markTile(index) {
    if (this.wS.currentPlayer === this.turn) {
      this.wS.playTurn(index, this.room);
      this.takeTurn(index);
    } else {
      window.alert('It\'s your opponent\'s turn');
    }
  }
  /*
   * public : advances the turn in the state
   */
  takeTurn(index) {
    if (this.turn === Turn.PLAYER_1) {
      this.grid[index].mark = this.playerOneIcon;
      this.turn = Turn.PLAYER_2;
    } else {
      this.grid[index].mark = this.playerTwoIcon;
      this.turn = Turn.PLAYER_1;
    }

    if (this.checkWin()) {
      if (this.turn === Turn.PLAYER_1) {
        this.gameResult =
          this.playerTwoIcon === Mark.CIRCLE
            ? GameResult.WIN_CIRCLE
            : GameResult.WIN_CROSS;
      } else {
        this.gameResult =
          this.playerOneIcon === Mark.CIRCLE
            ? GameResult.WIN_CIRCLE
            : GameResult.WIN_CROSS;
      }
      this.gameEnded = true;
      this.wS.gameEnded(this.gameResult);
    } else if (this.allCellsTaken()) {
      this.gameResult = GameResult.DRAW;
      this.gameEnded = true;
      this.wS.gameEnded(this.gameResult);
    }
  }

  get mark() {
    return Mark;
  }

  onResetGame() {
    this.turn = Turn.PLAYER_1;

    this.playerOneIcon = Mark.CIRCLE;
    this.playerTwoIcon = Mark.CROSS;

    this.gameResult = GameResult.DRAW;
    this.gameEnded = false;

    this.initializeGameBoard();
  }

  private allCellsTaken() {
    return !(this.grid.filter(cell => cell.mark === Mark.NONE).length > 0);
  }

  private checkWin() {
    const winCondition = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < winCondition.length; i++) {
      let a, b, c;
      a = this.grid[winCondition[i][0]].mark;
      b = this.grid[winCondition[i][1]].mark;
      c = this.grid[winCondition[i][2]].mark;
      if (a !== Mark.NONE) {
        if (a === b && a === c) {
          return true;
        }
      }
    }
  }

  private initializeGameBoard() {
    this.grid = [];
    // Row 1
    this.grid.push(new Cell(0, 0));
    this.grid.push(new Cell(0, 1));
    this.grid.push(new Cell(0, 2));

    // Row 2
    this.grid.push(new Cell(1, 0));
    this.grid.push(new Cell(1, 1));
    this.grid.push(new Cell(1, 2));

    // Row 3
    this.grid.push(new Cell(2, 0));
    this.grid.push(new Cell(2, 1));
    this.grid.push(new Cell(2, 2));
  }
}
