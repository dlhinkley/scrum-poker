import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    authState: any = null;

    constructor(private afAuth: AngularFireAuth) {
        this.afAuth.authState.subscribe((auth) => {
            this.authState = auth;
        });
    }

    get isLoggedIn(): boolean {
        return (this.authState !== null) ? this.authState.isAnonymous : false;
    }

    get currentUserId(): string {
        return (this.authState !== null) ? this.authState.uid : '';
    }

    loginOnce(): Promise<any> {

        if (this.isLoggedIn) {
            return Promise.resolve();
        } else {
            return this.anonymousLogin();
        }
    }

    private anonymousLogin(): Promise<any> {
        return this.afAuth.signInAnonymously()
        .then((user: any) => {
            this.authState = user;
        })
        .catch((error: any) => console.log(error));
    }

    signOut(): void {
        this.afAuth.signOut();
    }
}
