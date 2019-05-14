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
import {ForcastGet} from "../Shared/Weather/forcast-get";
import {ForcastListObject} from "../Shared/Weather/forcast-list-object";
import {NavController} from "@ionic/angular";

@Component({
    selector: 'app-trail-details',
    templateUrl: './trail-details.page.html',
    styleUrls: ['./trail-details.page.scss'],
})
export class TrailDetailsPage implements OnInit, OnDestroy {

    private trailID: number = Number(this.route.snapshot.paramMap.get('id'));
    private trailData: Observable<TrailData> = this.hikingService.getTrailDetails(this.trailID);
    private weatherData: Observable<WeatherGet>;
    private weatherForcast: Observable<ForcastGet>;
    private fiveDay: ForcastListObject[] = [];
    private hasHikedObs;
    private notHikedObs;
    private hikedBool: boolean = false;
    private notHikedBool: boolean = false;
    private loggedIn: boolean;
    private unsubscribe$ = new Subject();
    private userRating: number;
    private userRatingClasses: string[] = ['fas fa-hiking', 'fas fa-hiking', 'fas fa-hiking', 'fas fa-hiking', 'fas fa-hiking'];

    constructor(
        private hikingService: HikingAPIService,
        private route: ActivatedRoute,
        private weatherService: WeatherAPIService,
        private firestore: FirestoreService,
        private auth: AuthService,
        private nav: NavController,
    ) { }

    ngOnInit(): void {
        // Math.round(4.7);
        this.hikingService.getTrailDetails(this.trailID).subscribe((trailsData)=>{
            // console.log(trailsData);
            this.weatherData = this.weatherService.getWeatherForLatLong(trailsData.trails[0].latitude, trailsData.trails[0].longitude);
            this.weatherForcast = this.weatherService.getWeatherForcast(trailsData.trails[0].latitude, trailsData.trails[0].longitude);
            this.weatherForcast.subscribe((forcastData: ForcastGet)=>{
                // console.log(forcastData);
                for(let i: number = 0; i < forcastData.list.length; i++){
                    if(i===0 || i === 8 || i === 16 || i === 32 || i === forcastData.list.length -1){
                        this.fiveDay.push(forcastData.list[i]);
                        // console.log(this.fiveDay);
                    }
                }
            });
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
                                this.userRating = hikedList[i].rating;
                                this.updateRatingOnPage();
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
                                this.userRating = notHikedList[i].rating;
                                this.updateRatingOnPage();
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
        // console.log('ran get');
        this. weatherData = this.weatherService.getWeatherForLatLong(lat, long);
    }

    addToHiked(): void{
        // console.log('adding to hiked');
        if(this.notHikedBool){
            this.firestore.removeFromInterested(this.trailID);
        }
        this.trailData.pipe(
            takeUntil(this.unsubscribe$),
            tap((data: TrailData)=>{
                this.firestore.addToCompleted(this.trailID, data.trails[0].name);
            })
        ).subscribe();
    }

    addToWantToHike(): void{
        // console.log('adding to want to hike');
        this.trailData.pipe(
            takeUntil(this.unsubscribe$),
            tap((data: TrailData)=>{
                // console.log('name is: ',data.trails[0].name);
                this.firestore.addToInterested(this.trailID, data.trails[0].name);
            })
        ).subscribe();
    }

    // devReset(): void{
    //     this.firestore.removeFromCompleted(this.trailID);
    //     this.firestore.removeFromInterested(this.trailID);
    // }

    updateUserRating(rating: number): void{
        this.trailData.pipe(
            takeUntil(this.unsubscribe$),
            tap((data: TrailData)=>{
                this.firestore.addRating(rating, this.hikedBool, this.trailID, data.trails[0].name);
                let result: string[] = [];
                for(let i: number = 0; i < this.userRatingClasses.length; i++){
                    if(i < rating){
                        result.push('fas fa-hiking activeRating');
                    }
                    else{
                        result.push('fas fa-hiking');
                    }
                }
                this.userRatingClasses = result;
            })
        ).subscribe();
    }
    updateRatingOnPage(): void{
        let result: string[] = [];
        for(let i: number = 0; i < this.userRatingClasses.length; i++){
            if(i < this.userRating){
                result.push('fas fa-hiking activeRating');
            }
            else{
                result.push('fas fa-hiking');
            }
        }
        this.userRatingClasses = result;
    }
    ratingOnHover(elNum: number): void{
        // console.log(elNum);
        for(let i: number = 0; i < elNum; i++){
            this.userRatingClasses[i] += ' activeRating';
        }
    }
    resetHover(): void{
        if(this.userRating === null){
            this.userRatingClasses = ['fas fa-hiking', 'fas fa-hiking', 'fas fa-hiking', 'fas fa-hiking', 'fas fa-hiking'];
        }
        else{
            this.updateRatingOnPage();
        }
    }

    toComments(){
        this.nav.navigateForward(`/trail-details/${this.trailID}/comments`);
    }

}
