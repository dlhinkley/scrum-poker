import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddGameComponent } from './add-game/add-game.component';
import { AddUserComponent } from './add-user/add-user.component';
import { PlayComponent } from './play/play.component';
import { NavGuard } from './nav.guard';

const routes: Routes = [
   { 
      path: '',
	  redirectTo: '/play/null', 
	  pathMatch: 'full'
   },
  {
	 path: 'add-game',
     component: AddGameComponent,
     canActivate: [ NavGuard ],

  },
  {
	 path: 'add-user',
     component: AddUserComponent,
     canActivate: [ NavGuard ],
  },
  {
    path: 'play/:gameId',
    component: PlayComponent,
     canActivate: [ NavGuard ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
