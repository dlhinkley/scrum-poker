import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';
import { GameService } from '../game.service';
import { AuthService } from '../auth.service';
import { Game } from '../game';


@Component({
    selector: 'app-add-game',
    templateUrl: './add-game.component.html',
    styleUrls: ['./add-game.component.scss']
})
export class AddGameComponent implements OnInit {

    game: Game = {} as Game;

    constructor(
        private router: Router,
        private databaseService: DatabaseService,
        private gameService: GameService,
        private authService: AuthService,
    ) {
        console.log('add-game constructor');
    }

    ngOnInit(): void {
    }
    createGame(): void {
        this.game.show = false;
        this.authService.loginOnce()
        .then(() => {
            return this.databaseService.createGame(this.game);
        })
        .then((gameId: string) => {
            console.log('gameId=', gameId);
            this.gameService.setGameId(gameId);
            this.router.navigate(['add-user']);
        });
    }
    onSubmit(): void {
        this.createGame();
    }
}
