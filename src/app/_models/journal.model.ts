export interface Journal {
    id : number,
    amount : string,
    date : Date,
    libelle : string,
    nextBalance : number,
    previousBalance : number
}