import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';
import { GameService } from '../game.service';
import { Game } from '../game';


@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.scss']
})
export class AddGameComponent implements OnInit {

  game: Game = <Game>{};

  constructor(
		       private router: Router,
               private databaseService: DatabaseService,
               private gameService: GameService
  ) { 
  }

  ngOnInit(): void {
  }
  createGame() {
		this.databaseService.createGame(this.game)
		 .then(gameId => {
			console.log('gameId=', gameId)
			this.gameService.setGameId(gameId);
			this.router.navigate(['add-user']);
		  });
   }
   onSubmit() {
    this.createGame()
   }
}
