import { Component } from '@angular/core';
import { WebSocketService } from './services/web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public message: string;
  public playerName: string;
  public view = 'home';
  public room: number;

  constructor(private wS: WebSocketService) {
    this.wS.newGameStarted().subscribe(response => {
      this.message = `Hello, ${response.name}. Please ask your friend to enter Game ID:  ${response.room }. Waiting for player 2...`;
      this.playerName = response.name;
      this.view = '';
    });

    this.wS.opponentJoined().subscribe(response => {
      this.message = `Hello, ${this.playerName}`;
      this.room = response.room;
      this.view = 'board';
    });

    this.wS.beginGame().subscribe(response => {
      this.message = `Hello, ${response.name}`;
      this.room = response.room;
      this.view = 'board';
    });
  }
}
