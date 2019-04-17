import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from '../auth.service';
import { map } from 'rxjs/operators';
import {DBTrailData} from "../../Shared/DB/db-trail-data";

@Injectable({
    providedIn: 'root'
})
export class FirestoreService {
    constructor(
        private afs: AngularFirestore,
        private auth: AuthService
    ) { }

    // interested

    addToInterested(id: number):void {
        this.afs.doc(`users/${this.auth.currentUser.uid}/interested/${id}`).set({ id: id, rating: null });
    }

    addRating(rating: number, hasHiked: boolean, id: number):void{
        if(hasHiked){
            this.afs.doc(`users/${this.auth.currentUser.uid}/completed/${id}`).set({id: id, rating: rating});
        }
        else{
            this.afs.doc(`users/${this.auth.currentUser.uid}/interested/${id}`).set({id: id, rating: rating});
        }
    }

    removeFromInterested(id: number):void {
        this.afs.doc(`users/${this.auth.currentUser.uid}/interested/${id}`).delete();
    }

    isInterested(id: number) { // returns bool if interested or not
        return this.afs.doc(`users/${this.auth.currentUser.uid}/interested/${id}`).valueChanges().pipe(
            map(res => res ? true : false)
        );
    }

    getInterested() { // gets an array of interested
        return this.afs.collection<DBTrailData>(`users/${this.auth.currentUser.uid}/interested`).valueChanges();
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
        return this.afs.collection<DBTrailData>(`users/${this.auth.currentUser.uid}/completed`).valueChanges();
    }

}
