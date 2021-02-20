import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Game } from './game';
import { User } from './user';

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {

    constructor(private db: AngularFirestore) { }

    createGame(game: Game) {
        return this.db
        .collection('game')
        .add(game)
        .then(ref => {
            return ref.id;
        });
    }
    createUser(user: User) {
        return this.db
        .collection('user')
        .add(user)
        .then(ref => {
            return ref.id;
        });
    }
    setShow(gameId: string, show: boolean) {
        return this.db
        .collection('game')
        .doc(gameId)
        .update({ show: show});
    }
    deleteGame(gameId: string) {

        return this.db
        .collection('game')
        .doc(gameId)
        .delete()
        .then(() => {
            return this.db
            .collection('user', ref => ref.where('gameId', '==', gameId))
            .get()
            .subscribe(response => {
                const batch = this.db.firestore.batch();
                response.docs.forEach((doc) => {
                    batch.delete(doc.ref);	
                });
                return batch.commit();
            });
        })
    }

    clrPoints(gameId: string) {

        return this.db
        .collection('user', ref => ref.where('gameId', '==', gameId))
        .get()
        .subscribe(response => {
            const batch = this.db.firestore.batch();
            response.docs.forEach((doc) => {
                batch.update(doc.ref, {points: -1});	
            });
            return batch.commit();
        });
    }
    setPoints(userId: string, points: number) {
        return this.db
        .collection('user')
        .doc(userId)
        .update({ points: points});
    }
    getUsers(gameId: string): Observable<unknown[]> {
        return this.db.collection('user', ref => ref.where('gameId', '==', gameId)).valueChanges();
    };

    watchGame(gameId: string) {
        return this.db.doc('game/' + gameId).valueChanges()
    };
    getUser(userId: string) {
        return this.db.collection('user').doc(userId).get()
    };
    getGame(gameId: string) {
        return this.db.collection('game').doc(gameId).get()
    };
}
