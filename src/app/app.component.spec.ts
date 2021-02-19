import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatabaseService } from './database.service';
import { GameService } from './game.service';
import { MockProvider } from './mock.provider';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let gameService: GameService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
          //DatabaseService,
          MockProvider(DatabaseService, ['getGames', 'getUsers']),
          MockProvider(AngularFirestore, ['collection'])
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
		gameService = TestBed.inject(GameService);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'scrum-poker'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('scrum-poker');
  });

  it('should display create game if no game cookie', () => {
    spyOn(gameService, 'getGameId').and.returnValue('');

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.gameId).toBeFalsy()
  });


/*
  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('scrum-poker app is running!');
  });
 */
});
