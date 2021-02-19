import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DatabaseService } from '../database.service';
import { GameService } from '../game.service';
import { Game } from '../game';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {
  gameId: string = '';
  game: Game = <Game>{};

  constructor(
     private activatedRoute: ActivatedRoute,
     private gameService: GameService,
     private databaseService: DatabaseService,
  ) { 
  }
  ngOnInit(): void {
   this.activatedRoute.params.subscribe(parameter => {
      this.gameId = parameter.gameId;
	  this.gameService.setGameId(parameter.gameId);
      this.databaseService.getGame(this.gameId)
      	.subscribe((doc) => {
	      	this.game = <Game>doc.data();;
	   });
    });
  }
}
