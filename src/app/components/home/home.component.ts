import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../services/web-socket.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Turn } from '../../types/turn';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userForm: FormGroup;

  constructor(private wS: WebSocketService) {
  }

  ngOnInit() {
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      room: new FormControl()
    });
  }

  createNewGame() {
    const user = this.userForm.value;
    if (this.userForm.valid) {
      this.wS.currentPlayer = Turn.PLAYER_1;
      this.wS.createGame(user.name);
    }
  }

  joinGameRoom() {
    const user = this.userForm.value;
    if (this.userForm.valid) {
      this.wS.currentPlayer = Turn.PLAYER_2;
      this.wS.joinGame(user.name, user.room);
    }
  }
}
