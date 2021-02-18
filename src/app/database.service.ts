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
    return new Promise<any>((resolve, reject) =>{
        this.firestore
            .collection(this.collection)
            .add(game)
            .then(res => {}, err => reject(err));
    });
  }

 	get() {
	    return this.firestore.collection(this.collection);
	};

 	getGames() {
	    return this.firestore.collection(this.collection).valueChanges();
	};
}
