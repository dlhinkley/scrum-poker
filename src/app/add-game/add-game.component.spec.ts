import { AngularFirestore } from '@angular/fire/firestore';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FormsModule } from '@angular/forms';
import { FirestoreMock } from '../mock.firestore';
import { AddGameComponent } from './add-game.component';

xdescribe('AddGameComponent', () => {
    let component: AddGameComponent;
    let fixture: ComponentFixture<AddGameComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                FormsModule,
            ],
            declarations: [ AddGameComponent ],
            providers: [
                { provide: AngularFirestore, useValue: FirestoreMock },
            ],
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AddGameComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
