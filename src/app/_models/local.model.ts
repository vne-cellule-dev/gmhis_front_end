import { OwnerModule } from "../owner/owner.module";
import { IOwner } from "./owner";
import { Site } from "./site.model";
import { TypeLocaux } from "./typeLocaux.model";

export interface Local {
  adresseLocaux: string,
  etatLocaux: true,
  id: number,
  infoLocaux: string,
  loyerLocaux: number,
  refLocaux: string,
  site: Site,
  typeLocaux: TypeLocaux,
  proprietaire : IOwner

}