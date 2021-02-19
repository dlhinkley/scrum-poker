import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseService } from './database.service';
import { GameService } from './game.service';
import { Game } from './game';
import { User } from './user';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
  gameId: string; 
  game: Game = <Game>{};;

	items: Observable<any[]>;
	users: Observable<any[]>;
	title = 'scrum-poker';
	constructor(
					private databaseService: DatabaseService,
					private gameService: GameService
	) {
		let game: Game = {
			 name: 'first',
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
	//databaseService.createGame(game)
    this.gameId = gameService.getGameId(); 
		console.log('gameId=', this.gameId)
		this.items = databaseService.getGames();
	  this.users = databaseService.getUsers('first');
	}
	createGame() {
    this.databaseService.createGame(this.game)
		   .then(gameId => {
			    this.gameId = gameId;
		      console.log('gameId=', this.gameId)
		      this.gameService.setGameId(this.gameId);
			 });
	}
	onSubmit() {
    this.createGame()
	}
}
