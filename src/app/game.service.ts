
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class GameService {

    constructor(private cookies: CookieService) { }

    getGameId(): string {
        return this.cookies.get('gameId');
    }
    setGameId(gameId: string): void {
        this.cookies.delete('gameId');
        this.cookies.set('gameId', gameId);
    }
     deleteUserId(): void {
         this.cookies.delete('userId');
    }
    deleteGameId(): void {
         this.cookies.delete('gameId');
    }
    getUserId(): string {
        return this.cookies.get('userId');
    }
    setUserId(userId: string): void {
        this.cookies.delete('userId');
        this.cookies.set('userId', userId);
    }
}
