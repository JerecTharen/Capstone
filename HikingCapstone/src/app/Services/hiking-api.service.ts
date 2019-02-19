import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CoordData} from "../Shared/MapQuestData/coord-data";
import {TrailData} from "../Shared/TrailData/trail-data";

@Injectable({
  providedIn: 'root'
})
export class HikingAPIService {

  private DELETEMeTemp: string = '200419477-6a26f38699fbdcf3a1806e8543b20a20';

  constructor(
      private http: HttpClient
  ) { }

  getTrailsFor(coords: CoordData): Observable<TrailData>{
    return this.http.get<TrailData>(`https://www.hikingproject.com/data/get-trails?lat=${coords.lat}&lon=${coords.lng}&maxDistance=10&key=${this.DELETEMeTemp}`);
  }

  getTrailDetails(trailID: number): Observable<TrailData>{
    return this.http.get<TrailData>(`https://www.hikingproject.com/data/get-trails-by-id?ids=${trailID}&key=${this.DELETEMeTemp}`);
  }

}
