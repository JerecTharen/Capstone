import { Component, OnInit } from '@angular/core';
import {MapQuestAPIService} from "../Services/map-quest-api.service";
import {HikingAPIService} from "../Services/hiking-api.service";
import {MapQuestData} from "../Shared/MapQuestData/map-quest-data";
import {TrailData} from "../Shared/TrailData/trail-data";

@Component({
  selector: 'app-trail-search',
  templateUrl: './trail-search.page.html',
  styleUrls: ['./trail-search.page.scss'],
})
export class TrailSearchPage implements OnInit {

  private trails: any;

  constructor(
      private mapService: MapQuestAPIService,
      private hikingService: HikingAPIService
  ) { }

  ngOnInit() {
    this.mapService.getCoords(84003).subscribe((mapData: MapQuestData) =>{
      this.trails = this.hikingService.getTrailsFor(mapData.results[0].locations[0].latLng);
    });
  }

}
