import { TestBed } from '@angular/core/testing';
import { MockProvider } from './mock.provider';
import { CookieService } from 'ngx-cookie-service';

import { GameService } from './game.service';

describe('GameService', () => {
  let service: GameService;
  let cookieService: CookieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
	    providers: [
          MockProvider(CookieService, ['get', 'set'])
      ],
 	
		});
    service = TestBed.inject(GameService);
    cookieService = TestBed.inject(CookieService);

    spyOn(cookieService, 'get').and.returnValue('abcdefg');
    spyOn(cookieService, 'set');

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

	it('should set game id', () => {
    service.setGameId('abcdefg');
		expect(cookieService.set).toHaveBeenCalledWith('gameId', 'abcdefg' );
	});

	it('should get game id', () => {
    expect(service.getGameId()).toBe('abcdefg')
	});
});
