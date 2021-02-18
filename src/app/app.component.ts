import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseService } from './database.service';
import { Game } from './game';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  items: Observable<any[]>;
  users: Observable<any[]>;
  title = 'scrum-poker';
  constructor(db: DatabaseService) {
    let game: Game = {
       id: 'first',
		users: [
          <User>{
            name: 'Sam',
			points: 5
		  },
          <User>{
            name: 'Bob',
			points: 3
		  }
	   ]
	}
	//db.createGame(game)

    this.items = db.getGames();
	this.users = db.getUsers('first');
  }
}
