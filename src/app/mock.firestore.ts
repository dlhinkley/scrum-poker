import { Observable, BehaviorSubject, of } from 'rxjs';
export const FirestoreMock = {
    doc: () => {
        return {
            valueChanges: () => {
                return new Observable();
            }
        };
    }
};
