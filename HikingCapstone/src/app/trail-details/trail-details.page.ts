import {Component, OnDestroy, OnInit} from '@angular/core';
import {HikingAPIService} from "../Services/hiking-api.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from 'rxjs';
import {TrailData} from "../Shared/TrailData/trail-data";
import {WeatherAPIService} from "../Services/weather-api.service";
import {WeatherGet} from "../Shared/Weather/weather-get";

@Component({
  selector: 'app-trail-details',
  templateUrl: './trail-details.page.html',
  styleUrls: ['./trail-details.page.scss'],
})
export class TrailDetailsPage implements OnInit, OnDestroy {

  private trailID: number = Number(this.route.snapshot.paramMap.get('id'));
  private trailData: Observable<TrailData> = this.hikingService.getTrailDetails(this.trailID);
  private weatherData: Observable<WeatherGet>;

  constructor(
      private hikingService: HikingAPIService,
      private route: ActivatedRoute,
      private weatherService: WeatherAPIService
  ) { }

  ngOnInit(): void {
    // Math.round(4.7);
    this.hikingService.getTrailDetails(this.trailID).subscribe((trailsData)=>{
      // console.log(trailsData);
      this.weatherData = this.weatherService.getWeatherForLatLong(trailsData.trails[0].latitude, trailsData.trails[0].longitude);
    });
  }
  ngOnDestroy(): void {

  }

  getWeatherData(lat: number, long: number): void{
    console.log('ran get');
    this. weatherData = this.weatherService.getWeatherForLatLong(lat, long);
  }

}
