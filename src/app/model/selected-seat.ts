import {SeatType} from './seat-type';
import {ShowTime} from './showtime';

export class SelectedSeat {
  id: number;
  bookingDate: string;
  seatPosition: number;
  status: number;
  seatType: SeatType;
  showtime: ShowTime;
}
