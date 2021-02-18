import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Game } from './game';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private collection = 'game';

  constructor(private firestore: AngularFirestore) { }

  createGame(game: Game) {
    return this.firestore
            .collection(this.collection)
            .add(game)
            .then(ref => {
				return ref.id;
			});
  }

 	getUsers(gameId: string) {
	    return this.firestore.collection(this.collection).valueChanges();
	};

 	getGames() {
	    return this.firestore.collection(this.collection).valueChanges();
	};
}
