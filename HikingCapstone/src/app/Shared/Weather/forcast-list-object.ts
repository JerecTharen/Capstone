import {ForcastClouds} from "./forcast-clouds";
import {ForcastMain} from "./forcast-main";
import {ForcastSnow} from "./forcast-snow";
import {ForcastSys} from "./forcast-sys";
import {ForcastWeatherData} from "./forcast-weather-data";
import {ForcastRain} from "./forcast-rain";
import {ForcastWind} from "./forcast-wind";

export interface ForcastListObject {
    clouds: ForcastClouds;
    dt: number;
    dt_txt: string;
    main: ForcastMain;
    snow: ForcastSnow;
    rain: ForcastRain;
    sys: ForcastSys;
    weather: ForcastWeatherData[];
    wind: ForcastWind;
}
