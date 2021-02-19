import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
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
 
 	getUsers(gameId: string) {
	    return this.firestore.collection('user').valueChanges();
	};

 	getGames() {
	    return this.firestore.collection('game').valueChanges();
	};
}
