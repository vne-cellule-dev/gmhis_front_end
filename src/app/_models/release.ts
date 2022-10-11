import { Loyer } from "./loyer";

export interface Release {
    id : number,
    dateReco : Date,
    loyer : Loyer,
    numQuittance : string,
    etatLib : boolean
}
