import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { DatabaseService } from './database.service';
import { GameService } from './game.service';
import { User } from './user';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {
    gameId: string = ''; 
    title = 'scrum-poker';
    constructor(
        private router: Router,
        private databaseService: DatabaseService,
        private gameService: GameService
    ) {
        /*
           let gameId = this.gameService.getGameId(); 
           let userId = this.gameService.getUserId(); 
           console.log('gameId=', this.gameId)
           if (!gameId) {
           this.router.navigate(['add-game'])
           } else if (!userId) {
           this.router.navigate(['add-user'])
           }
           */
    }
    ngOnInit() {
    }
}
