import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/operators'
import { AngularFirestore } from '@angular/fire/firestore';
import { DatabaseService } from '../database.service';
import { GameService } from '../game.service';
import { AuthService } from '../auth.service';
import { Game } from '../game';
import { Card } from '../card';
import { User } from '../user';
import { Point } from '../point';

@Component({
    selector: 'app-play',
    templateUrl: './play.component.html',
    styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {
    users: User[] = <User[]>{};
    game: Game = <Game>{};
    user: User = <User>{};
    cards: Card[] = <Card[]>[];
    points: Point[] = <Point[]>[];
    defaults = [0, 1, 2, 3, 5, 8, 13, 21, 34];
    average: number  = 0;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private gameService: GameService,
        private databaseService: DatabaseService,
        private firestore: AngularFirestore,
        private authService: AuthService,
    ) { 
        console.log('play');

        this.defaults.forEach((v) => {
            const point = <Point> {value: v};
            this.points.push(point);
        });
    }
    updateCards() {
        this.cards = <Card[]>[];
        this.users.forEach(user => {
            let display = '';
            // In show mode, display points or X
            if (this.game.show) {
                display = (user.points > -1 ? user.points + '' : 'X');
            } else {
                display = (user.points > -1  ? '&#x2713;' : '?');
            }
            const selected = (user.points > -1);
            const card = <Card> {
                user: user,
                display: display,
                selected: selected,
            }
            this.cards.push(card);
        });
    }
    newGame(event: any) {
        this.databaseService.deleteGame(this.game.docId);
        this.gameService.deleteGameId();
        this.router.navigate(['add-game'])
    }
    updatePoints() {
        this.points.forEach(point => {
            point.selected = (point.value === this.user.points);
        });
    }
    setPoints(event: any, p: number): void {
        this.points.forEach(point => {
            point.selected = false;
        });
        this.updateCards();
        this.points[p].selected = true;
        this.databaseService.setPoints(this.user.docId, this.points[p].value)
    }
    clrPoints(event: any): void {
        this.databaseService.setShow(this.game.docId, false);
        this.databaseService.clrPoints(this.game.docId);
    }

    togglePoints(event: any): void {
        this.updateCards();
        this.databaseService.setShow(this.game.docId, ! this.game.show);
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
    handleGames(doc: any) {
        console.log('handleGames'); 
        // If game found
        if (doc) {
            console.log('handleGames doc=', doc);
            this.game = <Game>doc;
            this.gameService.setGameId(this.game.docId);
            return true;
        } else {
            console.log('handleGames no game found, navigating to add game');
            this.router.navigate(['add-game']);
            return false;
        }
    }
    handleUsers(users: any) {
        console.log('handleUsers'); 
        console.log('handleUsers users=', users);

        // See if we  have a userid
        const userId = this.gameService.getUserId();
        console.log('handleUsers userId=', userId);
        console.log('handleUsers gameId=', this.game.docId);
        if (!userId) {
            console.log('handleUsers no userId, forwarding to add user');
            this.router.navigate(['add-user']);
        }

        this.users = <User[]>users;
        this.user = <User>{};
        this.users.forEach(user => {
            console.log('handleUsers user', user);
            // Save my user
            if (user.docId == userId && user.gameId === this.game.docId) {
                this.user = <User> user;
                console.log('handleUsers found user', user);
                this.updatePoints();
            }
        });
        // If my user not found, add it
        if (!this.user.docId) {
            this.gameService.deleteUserId();
            console.log('user not found, navigate to add-user');
            this.router.navigate(['add-user']);
        }
        this.setAverage();
        this.updateCards();
    }
    ngOnInit(): void {
        this.authService.loginOnce()
        .then(() => {
            this.activatedRoute.params.subscribe(parameter => {
                const gameId = parameter.gameId;
                if (gameId === 'null') {
                    console.log('ngOnInit gameId is null, navigate to add game');
                    this.router.navigate(['add-game']);

                } else {

                    console.log('ngOnInit gameId=', gameId);

                    // If no gameid, navigate to create a game
                    // If you don't have a user id yet, navigate to create a user 


                    // Get the game
                    this.databaseService.watchGame(gameId)
                    .subscribe((doc: any) => {
                        const success = this.handleGames(doc);

                        if (success) {
                            // Load the users (including changes)
                            this.databaseService.getUsers(gameId)
                            .subscribe((doc: any) => {
                                this.handleUsers(doc);
                            });
                        }
                    });
                }
            });
        });
    }
}
