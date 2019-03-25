import {ForcastCity} from "./forcast-city";
import {ForcastListObject} from "./forcast-list-object";

export interface ForcastGet {
    city: ForcastCity;
    cnt: number;
    cod: string;
    list: ForcastListObject[];
    message: number;
}
