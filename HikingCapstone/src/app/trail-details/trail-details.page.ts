import {Component, OnDestroy, OnInit} from '@angular/core';
import {HikingAPIService} from "../Services/hiking-api.service";
import {ActivatedRoute} from "@angular/router";
import {Observable, Subject} from 'rxjs';
import {TrailData} from "../Shared/TrailData/trail-data";
import {WeatherAPIService} from "../Services/weather-api.service";
import {WeatherGet} from "../Shared/Weather/weather-get";
import {FirestoreService} from "../Services/firestore/firestore.service";
import {AuthService} from "../Services/auth.service";
import {DBTrailData} from "../Shared/DB/db-trail-data";
import {takeUntil, tap} from "rxjs/operators";

@Component({
  selector: 'app-trail-details',
  templateUrl: './trail-details.page.html',
  styleUrls: ['./trail-details.page.scss'],
})
export class TrailDetailsPage implements OnInit, OnDestroy {

  private trailID: number = Number(this.route.snapshot.paramMap.get('id'));
  private trailData: Observable<TrailData> = this.hikingService.getTrailDetails(this.trailID);
  private weatherData: Observable<WeatherGet>;
  private hasHikedObs;
  private notHikedObs;
  private hikedBool: boolean = false;
  private notHikedBool: boolean = false;
  private loggedIn: boolean;
  private unsubscribe$ = new Subject();

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
      // console.log('in logged in block');
      this.loggedIn = loggedIn;
      if(this.loggedIn){
        // console.log('Logged In True');
        this.hasHikedObs = this.firestore.getCompleted().pipe(
          takeUntil(this.unsubscribe$),
          tap((hikedList: DBTrailData[]) => {
            let found = false;
            for(let i: number = 0; i < hikedList.length; i++){
                // console.log(hikedList);
                // console.log(`Checking ${hikedList[i].id} against ${this.trailID}`);
              if(hikedList[i].id === this.trailID){
                found = true;
              }
            }
            if(found){
              this.hikedBool = true;
            }
          })
        ).subscribe();
        this.notHikedObs = this.firestore.getInterested().pipe(
          takeUntil(this.unsubscribe$),
          tap((notHikedList: DBTrailData[])=>{
              // console.log('In Want to Hike Block');
            let found = false;
            for(let i: number = 0; i < notHikedList.length; i++){
                // console.log(`Checking ${notHikedList[i].id} against ${this.trailID}`);
              if(notHikedList[i].id === this.trailID){
                found = true;
              }
            }
            if(found){
              this.notHikedBool = true;
            }
          })
        ).subscribe();
      }
    });
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getWeatherData(lat: number, long: number): void{
    console.log('ran get');
    this. weatherData = this.weatherService.getWeatherForLatLong(lat, long);
  }

  addToHiked(): void{
    console.log('adding to hiked');
    if(this.notHikedBool){
      this.firestore.removeFromInterested(this.trailID);
    }
    this.firestore.addToCompleted(this.trailID);
  }

  addToWantToHike(): void{
    console.log('adding to want to hike');
    this.firestore.addToInterested(this.trailID);
  }

  devReset(): void{
    this.firestore.removeFromCompleted(this.trailID);
    this.firestore.removeFromInterested(this.trailID);
  }

}
