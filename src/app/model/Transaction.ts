import {Member} from './Member';
import {ShowTime} from './showtime';
import {SelectedSeat} from './selected-seat';

export class Transaction {
  id?: number;
  code?: string;
  transactionalDate?: string;
  ticketStatus?: string;
  showTime?: ShowTime;
  member?: Member;
  checkAcceptTicket?: number;
  pointGained?: number;
  pointUsed?: number;
  seatNote?: string;

}

