import {CoordData} from "./coord-data";
import {WeatherData} from "./weather-data";
import {MainData} from "./main-data";

export interface WeatherGet {
    coord: CoordData;
    weather: WeatherData[];
    base: string;
    main: MainData;
    visibility: number;
    wind: object;
    clouds: object;
    dt: number;
    sys: object;
    id: number;
    name: string;
    cod: number;
}
