
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
        this.cookies.set('gameId', gameId);
    }
    getUserId(): string {
        return this.cookies.get('userId');
    }
    setUserId(userId: string): void {
        this.cookies.set('userId', userId);
    }
}
