import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
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
    userId: string = '';
    users: User[] = <User[]>{};
    game: Game = <Game>{};
    user: User = <User>{};
    points = [0, 1, 2, 3, 5, 8, 13, 21, 34];
    average: number  = 0;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private gameService: GameService,
        private databaseService: DatabaseService,
        private firestore: AngularFirestore,
    ) { 
        console.log('play');
    }
    setPoints(event: any, points: number): void {
        this.databaseService.setPoints(this.userId, points)
    }
    clrPoints(event: any): void {
        this.databaseService.clrPoints(this.gameId);
    }

    togglePoints(event: any): void {
        this.databaseService.setShow(this.gameId, ! this.game.show);
    }
    pointsSelected(point: number) {
        let style = 'btn-outline-primary';
        if (point == this.user.points) {
            style = 'btn-primary';
        }
        return style;
    }
    setAverage(): void {
        let count = 0;
        let sum = 0;
        this.average = 0;

        this.users.forEach(user => {
            if (user.points > -1) {
                sum += user.points;
                count++;
            }
            if (count > 0) {
                this.average = Math.round(sum / count * 10) / 10;
            }
        });
    }
    ngOnInit(): void {
        this.activatedRoute.params.subscribe(parameter => {
            this.gameId = parameter.gameId;
            // If no gameid, navigate to create a game
            // If you don't have a user id yet, navigate to create a user 
            this.userId = this.gameService.getUserId();
            if (!this.userId) {
                this.router.navigate(['add-user'])
            }
            // See if the game exists

            this.databaseService.getGame(this.gameId)
            .subscribe((doc) => {
                // If game found
                if (doc.data()) {
                    console.log('this.game', doc.data());
                    this.gameService.setGameId(this.gameId);
                } else {
                    this.router.navigate(['add-game'])
                }
            });
            this.databaseService.getUser(this.userId)
            .subscribe((doc) => {
                // If game found
                if (doc.data()) {
                    console.log('this.user', doc.data());
                    this.user = <User> doc.data();
                    if (this.user.gameId !== this.gameId) {
                        this.router.navigate(['add-user'])
                    }
                } else {
                    this.router.navigate(['add-user'])
                }
            });

            // Load the users (including changes)
            this.databaseService.getUsers(this.gameId)
            .subscribe((users ) => {
                console.log('users=', users);
                this.users = <User[]>users;
                this.setAverage();
            });
            this.databaseService.watchGame(this.gameId)
            .subscribe((doc) => {
                console.log('games=', doc);
                this.game = <Game>doc;
            });;
        });
    }
}
