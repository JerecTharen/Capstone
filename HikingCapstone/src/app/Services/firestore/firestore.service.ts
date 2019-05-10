import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from '../auth.service';
import { map } from 'rxjs/operators';
import {DBTrailData} from "../../Shared/DB/db-trail-data";
import {DbComment} from "../../Shared/DB/db-comment";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class FirestoreService {
    constructor(
        private afs: AngularFirestore,
        private auth: AuthService
    ) { }

    // interested

    addToInterested(id: number, name: string):void {
        this.afs.doc(`users/${this.auth.currentUser.uid}/interested/${id}`).set({ id: id, rating: null, name: name });
    }

    addRating(rating: number, hasHiked: boolean, id: number):void{
        if(hasHiked){
            this.afs.doc(`users/${this.auth.currentUser.uid}/completed/${id}`).set({id: id, rating: rating});
        }
        else{
            this.afs.doc(`users/${this.auth.currentUser.uid}/interested/${id}`).set({id: id, rating: rating});
        }
    }

    addComment(trailID: number, comment: string): void{
        this.afs.doc<DbComment>(`allComments/${trailID}/comments/${this.auth.currentUser.uid}`).set({uid: this.auth.currentUser.uid, trailID: trailID, comment: comment});
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

    addToCompleted(id: number, name: string) {
        this.afs.doc(`users/${this.auth.currentUser.uid}/completed/${id}`).set({ id: id, name: name });
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

    getComments(trailID: number): Observable<DbComment[][]>{
        return this.afs.collection<DbComment[]>(`allComments/${trailID}/comments`).valueChanges();
    }

    getUserComment(trailID: number): Observable<DbComment>{
        return this.afs.doc<DbComment>(`allComments/${trailID}/comments/${this.auth.currentUser.uid}`).valueChanges();
    }

}
