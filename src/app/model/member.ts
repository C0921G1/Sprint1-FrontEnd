import {Account} from './account';
import {City} from './city';

export class Member {
  id?: string;
  name?: string;
  gender?: number;
  phone?: string;
  email?: string;
  address?: string;
  point?: number;
  image?: string;
  dateOfBirth?: string;
  identityNumber?: string;
  city?: City
  account?: Account;

}
