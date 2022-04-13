import {FilmType} from "./Film-type";
import {ShowTime} from "./ShowTime";

export class Film {
  id: number;
  name: string;
  duration: string;
  startDate: string;
  endDate: string;
  actor: string;
  director: string;
  studio: string;
  image: string;
  trailer: string;
  version: string;
  flagDelete: number;
  filmTypeNew : string;
  filmType: FilmType;
  showTime: ShowTime;
}
