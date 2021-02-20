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

  constructor(private firestore: AngularFirestore) { }

  createGame(game: Game) {
    return this.firestore
            .collection('game')
            .add(game)
            .then(ref => {
				return ref.id;
			});
  }
    createUser(user: User) {
     return this.firestore
            .collection('user')
            .add(user)
            .then(ref => {
				return ref.id;
			});
   }
   setShow(gameId: string, show: boolean) {
     return this.firestore
            .collection('game')
			.doc(gameId)
            .update({ show: show});
   }
   clrPoints(gameId: string) {

	 const userRef = this.firestore
	    .collection('user', ref => ref.where('gameId', '==', gameId));

     batch.update(userRef, { points: -1});

	 return natch.commit();
   }
   setPoints(userId: string, points: number) {
     return this.firestore
            .collection('user')
			.doc(userId)
            .update({ points: points});
   }
 	getUsers(gameId: string): Observable<unknown[]> {
	    return this.firestore.collection('user', ref => ref.where('gameId', '==', gameId)).valueChanges();
	};

 	watchGame(gameId: string) {
	    return this.firestore.doc('game/' + gameId).valueChanges()
	};
 	getUser(userId: string) {
	    return this.firestore.collection('user').doc(userId).get()
	};
 	getGame(gameId: string) {
	    return this.firestore.collection('game').doc(gameId).get()
	};
}
