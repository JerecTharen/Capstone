import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FirestoreService} from "../../Services/firestore/firestore.service";
import {Observable, Subject, Subscription} from "rxjs";
import {takeUntil, tap} from "rxjs/operators";
import {DbComment} from "../../Shared/DB/db-comment";
import {AuthService} from "../../Services/auth.service";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {

  private trailID: number = Number(this.route.snapshot.paramMap.get('id'));
  private userComment: string;
  private userCommentObs: Subscription;
  private allComments: Observable<DbComment[][]> = this.firestore.getComments(this.trailID);
  private unsubscribe$ = new Subject();
  private loggedBool = this.auth.authed();

  constructor(
      private route: ActivatedRoute,
      private firestore: FirestoreService,
      private auth: AuthService
  ) { }

  ngOnInit() {
    // console.log(this.trailID);

    this.userCommentObs = this.firestore.getUserComment(this.trailID).pipe(
        takeUntil(this.unsubscribe$),
        tap((userComment: DbComment) => {
          if(userComment){
            this.userComment = userComment.comment;
          }
        })
    ).subscribe();
  }

  addComment(){
    this.firestore.addComment(this.trailID, this.userComment);
  }

}
