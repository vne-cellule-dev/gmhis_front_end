import { DeviceType } from "./device-type.model";
import { Guaranty } from "./guaranty.model";

export interface ArticleSav{
    id : number,
    isActive : Boolean,
    name : string,
    reference : string,
    guaranty : Guaranty,
    deviceType : DeviceType
}