import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GameResult } from '../../types/game-result';

@Component({
  selector: 'app-game-result-model',
  templateUrl: './game-result-model.component.html',
  styleUrls: ['./game-result-model.component.css']
})
export class GameResultModelComponent {

  @Input() gameResult: GameResult = GameResult.DRAW;
  @Output() resetGame = new EventEmitter<boolean>();

  playAgain() {
    this.resetGame.emit(true);
  }

}
