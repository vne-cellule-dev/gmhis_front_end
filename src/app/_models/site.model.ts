import { Commune } from "./commune.model";

export interface Site {
    commune: Commune,
    id: number,
    infoSite: string,
    localisationSite: string,
    nomSite: string,
    nombreLocaux: number
}