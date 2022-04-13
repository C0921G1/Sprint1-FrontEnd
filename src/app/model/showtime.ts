import {Film} from './film';
import {Screen} from './screen';


export class ShowTime {
  id?: number;
  date?: string;
  name?: string;
  screen?: Screen;
  film?: Film;
  selectedSeats?: any;
  transaction?: any;
}
