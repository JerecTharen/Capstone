import {Component, OnDestroy, OnInit} from '@angular/core';
import {HikingAPIService} from "../Services/hiking-api.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from 'rxjs';
import {TrailData} from "../Shared/TrailData/trail-data";
import {WeatherAPIService} from "../Services/weather-api.service";
import {WeatherGet} from "../Shared/Weather/weather-get";
import {FirestoreService} from "../Services/firestore/firestore.service";
import {AuthService} from "../Services/auth.service";

@Component({
  selector: 'app-trail-details',
  templateUrl: './trail-details.page.html',
  styleUrls: ['./trail-details.page.scss'],
})
export class TrailDetailsPage implements OnInit, OnDestroy {

  private trailID: number = Number(this.route.snapshot.paramMap.get('id'));
  private trailData: Observable<TrailData> = this.hikingService.getTrailDetails(this.trailID);
  private weatherData: Observable<WeatherGet>;
  private hasHiked;
  private notHiked;
  private loggedIn: boolean;

  constructor(
      private hikingService: HikingAPIService,
      private route: ActivatedRoute,
      private weatherService: WeatherAPIService,
      private firestore: FirestoreService,
      private auth: AuthService,
  ) { }

  ngOnInit(): void {
    // Math.round(4.7);
    this.hikingService.getTrailDetails(this.trailID).subscribe((trailsData)=>{
      // console.log(trailsData);
      this.weatherData = this.weatherService.getWeatherForLatLong(trailsData.trails[0].latitude, trailsData.trails[0].longitude);
    });

    this.auth.authed().subscribe((loggedIn)=>{
      this.loggedIn = loggedIn;
      if(this.loggedIn){
        this.hasHiked = this.firestore.getCompleted();
        this.notHiked = this.firestore.getInterested();
      }
    });
  }
  ngOnDestroy(): void {

  }

  getWeatherData(lat: number, long: number): void{
    console.log('ran get');
    this. weatherData = this.weatherService.getWeatherForLatLong(lat, long);
  }

}
