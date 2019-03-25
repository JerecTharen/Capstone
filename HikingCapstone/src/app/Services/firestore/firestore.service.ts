import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from '../auth.service';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FirestoreService {
    constructor(
        private afs: AngularFirestore,
        private auth: AuthService
    ) { }

    // interested

    addToInterested(id: number) {
        this.afs.doc(`users/${this.auth.currentUser.uid}/interested/${id}`).set({ id });
    }

    removeFromInterested(id: number) {
        this.afs.doc(`users/${this.auth.currentUser.uid}/interested/${id}`).delete();
    }

    isInterested(id: number) { // returns bool if interested or not
        return this.afs.doc(`users/${this.auth.currentUser.uid}/interested/${id}`).valueChanges().pipe(
            map(res => res ? true : false)
        );
    }

    getInterested() { // gets an array of interested
        return this.afs.collection(`users/${this.auth.currentUser.uid}/interested`).valueChanges();
    }

    // completed

    addToCompleted(id: number) {
        this.afs.doc(`users/${this.auth.currentUser.uid}/completed/${id}`).set({ id });
    }

    removeFromCompleted(id: number) {
        this.afs.doc(`users/${this.auth.currentUser.uid}/completed/${id}`).delete();
    }

    isCompleted(id: number) { // returns bool if completed or not
        return this.afs.doc(`users/${this.auth.currentUser.uid}/completed/${id}`).valueChanges().pipe(
            map(res => res ? true : false)
        );
    }

    getCompleted() { // gets an array of completed
        return this.afs.collection(`users/${this.auth.currentUser.uid}/completed`).valueChanges();
    }

}
