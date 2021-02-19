import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DatabaseService } from '../database.service';
import { GameService } from '../game.service';
import { Game } from '../game';
import { User } from '../user';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {
  gameId: string = '';
  users: Observable<any> = <Observable<any>>{};
  game: Observable<any> = <Observable<any>>{};

  constructor(
	 private router: Router,
     private activatedRoute: ActivatedRoute,
     private gameService: GameService,
     private databaseService: DatabaseService,
  ) { 
		  console.log('play');
  }
  ngOnInit(): void {
   this.activatedRoute.params.subscribe(parameter => {
      this.gameId = parameter.gameId;
	  // If no gameid, navigate to create a game
	  // If you don't have a user id yet, navigate to create a user 
      let userId = this.gameService.getUserId();
      if (!userId) {
          this.router.navigate(['add-user'])
	  }
      // Load the game name
      this.databaseService.getGame(this.gameId)
      	.subscribe((doc) => {
            // If game found
			if (doc.data()) {
			   console.log('this.game', doc.data());
		       this.game = this.databaseService.watchGame(this.gameId);	
	           this.gameService.setGameId(this.gameId);
			} else {
               this.router.navigate(['add-game'])
			}
	   });
	   // Load the users (including changes)
      this.users = this.databaseService.getUsers(this.gameId);
    });
  }
}
