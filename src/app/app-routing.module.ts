import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddGameComponent } from './add-game/add-game.component';
import { AddUserComponent } from './add-user/add-user.component';
import { PlayComponent } from './play/play.component';

const routes: Routes = [
  {
	 path: 'add-game',
     component: AddGameComponent,
  },
  {
	 path: 'add-user',
     component: AddUserComponent,
  },
  {
    path: 'play/:gameId',
    component: PlayComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
