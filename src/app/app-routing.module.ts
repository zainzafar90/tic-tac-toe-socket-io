import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameBoardComponent } from './game-board/game-board.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'game/:room',
    component: GameBoardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
