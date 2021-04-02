import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class NavGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router,
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Promise<boolean> {
            console.log('route=', route);
            console.log('state=', state);
            return this.authService.loginOnce()
            .then(() => {
                // If we're on /play and no gameId, add a game
                if (state.url === '/play/null') {
                    console.log('ngOnInit gameId is null, navigate to add game');
                    this.router.navigate(['add-game']);
                    return false;
                } 

                else {
                    return true;
                }
            });
        }
                /*
                 else {

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
        }
                    */

}
