export interface Guaranty{
    id : number,
    days : number,
    exclusions : any[],
    months : number,
    name : string,
    othersServices : string,
    repair : boolean,
    substitution : boolean
}