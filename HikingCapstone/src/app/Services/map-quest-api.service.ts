import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MapQuestData} from "../Shared/MapQuestData/map-quest-data";

@Injectable({
  providedIn: 'root'
})
export class MapQuestAPIService {

  private DELETEMeTemp: string = 'A8yEEeGHWcsBKV8k2A0ph913CJBhJxg6';

  constructor(
      private http: HttpClient
  ) { }

  getCoords(zip: number):Observable<MapQuestData>{
      // console.log('blue');
    return this.http.get<MapQuestData>(`https://www.mapquestapi.com/geocoding/v1/address?key=${this.DELETEMeTemp}&location=${zip}`);
  }

}
