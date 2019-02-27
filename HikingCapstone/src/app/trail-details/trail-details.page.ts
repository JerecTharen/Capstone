import { Component, OnInit } from '@angular/core';
import {HikingAPIService} from "../Services/hiking-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from 'rxjs';
import {TrailData} from "../Shared/TrailData/trail-data";

@Component({
  selector: 'app-trail-details',
  templateUrl: './trail-details.page.html',
  styleUrls: ['./trail-details.page.scss'],
})
export class TrailDetailsPage implements OnInit {

  private trailID: number = Number(this.route.snapshot.paramMap.get('id'));
  private trailData: Observable<TrailData> = this.hikingService.getTrailDetails(this.trailID);

  constructor(
      private hikingService: HikingAPIService,
      private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    Math.round(4.7);
  }

}
