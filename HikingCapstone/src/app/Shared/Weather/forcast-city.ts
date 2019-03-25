import {CoordData} from "./coord-data";

export interface ForcastCity {
    coord: CoordData;
    country: string;
    id: number;
    name: string;
    population: number;
}
