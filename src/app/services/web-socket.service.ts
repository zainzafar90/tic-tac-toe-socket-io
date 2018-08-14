import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment.prod';
import { GameResult } from '../types/game-result';
import { Observable } from 'rxjs';
import { Turn } from '../types/turn';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket = io();

  currentPlayer: Turn;

  constructor() {}

  /**
   * EVENT EMITTERS
   * @author Zain Zafar
   */
  createGame(name) {
    this.socket.emit('createGame', { name: name });
  }

  joinGame(name, room) {
    this.socket.emit('joinGame', { name, room });
  }

  playTurn(tileIndex, room) {
    // Emit an event to update other player that you've played your turn.
    this.socket.emit('playTurn', {
      tile: tileIndex,
      room: room
    });
  }

  gameEnded(gameResult: GameResult) {
    this.socket.emit('gameEnded', gameResult);
  }


  /**
   * EVENT LISTENERS
   * @author Zain Zafar
   */
  newGameStarted() {
    return new Observable<{ name: string; room: number }>(observer => {
      this.socket.on('newGame', data => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

  opponentJoined() {
    return new Observable<{room: number}>(observer => {
      this.socket.on('player1', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

  beginGame() {
    return new Observable<{ name: string; room: number }>(observer => {
      this.socket.on('player2', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

  turnPlayed() {
    return new Observable<any>(observer => {
      this.socket.on('turnPlayed', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnected();
      };
    });
  }

  gameEnd() {
    return new Observable<{message: string, room: string}>( observer => {
      this.socket.on('gameEnd', (data) => {
        this.socket.leave(data.room);
        observer.next(data);
      });
      return () => {
        this.socket.disconnected();
      };
    });
  }

  //  // If the other player wins, this event is received. Notify user game has ended.
  //  socket.on('gameEnd', (data) => {
  //   game.endGame(data.message);
  //   socket.leave(data.room);
  // });

  /**
	 * End the game on any err event.
	 */
  // socket.on('err', (data) => {
  //   game.endGame(data.message);
  // });
}
