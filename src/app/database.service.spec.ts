import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { MockProvider } from './mock.provider';
import { FirestoreMock } from './mock.firestore';

import { Observable, BehaviorSubject } from 'rxjs';
import { DatabaseService  } from './database.service';

describe('DatabaseService', () => {
    let service: DatabaseService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: AngularFirestore, useValue: FirestoreMock },
            ],

        });
        service = TestBed.inject(DatabaseService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
