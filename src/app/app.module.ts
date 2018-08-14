import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { CrossComponent } from './icons/cross/cross.component';
import { CircleComponent } from './icons/circle/circle.component';
import { GameResultModelComponent } from './modals/game-result-model/game-result-model.component';
import { WebSocketService } from './services/web-socket.service';
import { HomeComponent } from './components/home/home.component';
import { GameFooterComponent } from './game-board/game-footer/game-footer.component';

@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent,
    CrossComponent,
    CircleComponent,
    GameResultModelComponent,
    HomeComponent,
    GameFooterComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  bootstrap: [ AppComponent ],
  providers: [WebSocketService]
})
export class AppModule {}
