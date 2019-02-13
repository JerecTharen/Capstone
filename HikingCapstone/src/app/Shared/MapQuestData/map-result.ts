import {ProvidedLocationData} from "./provided-location-data";
import {LocationData} from "./location-data";

export interface MapResult {
    locations: LocationData[];
    providedLocation: ProvidedLocationData;
}
