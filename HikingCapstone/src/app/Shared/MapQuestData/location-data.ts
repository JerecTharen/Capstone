import {DisplayCoordData} from "./display-coord-data";
import {CoordData} from "./coord-data";

export interface LocationData {
    adminArea1: string;
    adminArea1Type: string;
    adminArea3: string;
    adminArea3Type: string;
    adminArea4: string;
    adminArea4Type: string;
    adminArea5: string;
    adminArea5Type: string;
    adminArea6: string;
    adminArea6Type: string;
    displayLatLng: DisplayCoordData;
    dragPoint: boolean;
    geocodeQuality: string;
    geocodeQualityCode: string;
    latLng: CoordData;
    linkId: string;
    mapUrl: string;
    postalCode: string;
    sideOfStreet: string;
    street: string;
    type: string;
    unknownInput: string;
}
