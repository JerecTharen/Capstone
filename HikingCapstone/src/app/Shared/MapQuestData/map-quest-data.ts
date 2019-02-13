import {InfoData} from "./info-data";
import {OptionsData} from "./options-data";
import {MapResult} from "./map-result";

export interface MapQuestData {
    info: InfoData;
    options: OptionsData;
    results: MapResult[];
}
