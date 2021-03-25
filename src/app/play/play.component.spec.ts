import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FirestoreMock } from '../mock.firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { MockProvider } from '../mock.provider';
import { PlayComponent } from './play.component';

xdescribe('PlayComponent', () => {
    let component: PlayComponent;
    let fixture: ComponentFixture<PlayComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [ PlayComponent ],
            providers: [
                { provide: AngularFirestore, useValue: FirestoreMock },
            ],
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PlayComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
