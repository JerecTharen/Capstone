import { Component, OnInit } from '@angular/core';
import {MapQuestAPIService} from "../Services/map-quest-api.service";
import {HikingAPIService} from "../Services/hiking-api.service";
import {MapQuestData} from "../Shared/MapQuestData/map-quest-data";
import {TrailData} from "../Shared/TrailData/trail-data";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-trail-search',
  templateUrl: './trail-search.page.html',
  styleUrls: ['./trail-search.page.scss'],
})
export class TrailSearchPage implements OnInit {

  private trails: Observable<TrailData>;
  private search: number;
  private invalidZip: boolean = false;

  constructor(
      private mapService: MapQuestAPIService,
      private hikingService: HikingAPIService,
      private router: Router
  ) { }

  ngOnInit() {
  }

  searchForTrail():void{
    if(this.search > 9999 && this.search < 100000){
      this.invalidZip = false;
      this.mapService.getCoords(this.search).subscribe((mapData: MapQuestData) =>{
        this.trails = this.hikingService.getTrailsFor(mapData.results[0].locations[0].latLng);
        this.trails.subscribe((trail)=>{
          console.log(trail);
        });
      });
    }
    else{
      this.invalidZip = true;
    }
  }

  goToTrail(trailID: number): void{
    this.router.navigate([`trail-details/${trailID}`]);
  }

}
