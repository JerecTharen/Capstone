import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../Services/firestore/firestore.service';
import { Observable } from 'rxjs';
import { DBTrailData } from '../Shared/DB/db-trail-data';

@Component({
  selector: 'app-my-trails',
  templateUrl: './my-trails.page.html',
  styleUrls: ['./my-trails.page.scss'],
})
export class MyTrailsPage implements OnInit {
  tab: string = 'hiked';

  $hiked: Observable<DBTrailData[]>;
  $interested: Observable<DBTrailData[]>;

  constructor(
    private fs: FirestoreService
  ) { }

  ngOnInit() {
    this.$hiked = this.fs.getCompleted();
    this.$interested = this.fs.getInterested();
  }

}
