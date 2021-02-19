import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';
import { GameService } from '../game.service';
import { User } from '../user';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  user: User = <User>{};

  constructor(
		       private router: Router,
               private databaseService: DatabaseService,
               private gameService: GameService
  ) { 
  }

  ngOnInit(): void {
  }
  createUser() {
        this.user.gameId = this.gameService.getGameId();
		this.databaseService.createUser(this.user)
		 .then(userId => {
			console.log('userId=', userId)
			this.gameService.setUserId(userId);
			this.router.navigate(['play/' + this.user.gameId]);
		  });
   }
   onSubmit() {
    this.createUser()
   }
}
