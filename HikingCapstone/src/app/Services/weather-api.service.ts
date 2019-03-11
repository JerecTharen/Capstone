import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {WeatherGet} from "../Shared/Weather/weather-get";

@Injectable({
  providedIn: 'root'
})
export class WeatherAPIService {

  private DELETEMeTemp: string = '331445f7f2a45476f03b3e9e0ca910a0';

  constructor(
      private http: HttpClient
  ) { }

  getWeatherForLatLong(lat: number, long: number): Observable<WeatherGet>{
    return this.http.get<WeatherGet>(`api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}`);
  }

  getWeatherForZIP(zipcode: number): Observable<WeatherGet>{
    return this.http.get<WeatherGet>(`api.openweathermap.org/data/2.5/weather?zip=${zipcode},us`);
  }

}
