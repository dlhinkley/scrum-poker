import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { MockProvider } from './mock.provider';

import { DatabaseService } from './database.service';

describe('DatabaseService', () => {
  let service: DatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
	     providers: [
          MockProvider(AngularFirestore, ['collection'])
      ],
 	
		});
    service = TestBed.inject(DatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
