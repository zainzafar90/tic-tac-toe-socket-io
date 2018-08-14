import { Component, Input } from '@angular/core';
import { Turn } from '../../types/turn';
import { WebSocketService } from '../../services/web-socket.service';

@Component({
  selector: 'app-game-footer',
  templateUrl: './game-footer.component.html',
  styleUrls: ['./game-footer.component.css']
})
export class GameFooterComponent {

  @Input()
  turn: Turn;

  constructor(private wS: WebSocketService) {}

  get currentPlayer() {
    return this.wS.currentPlayer;
  }
}
