import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Transaction} from '../../model/Transaction';
import {TokenStorageService} from '../security/token-storage.service';


@Injectable({
  providedIn: 'root'
})
export class BookingManageService {
  private httpOptions: any;
  private API_URL_BOOKING = 'http://localhost:8080/c09/admin/BookingTicket';

  constructor(private http: HttpClient,
              private tokenStorage: TokenStorageService) {
  }
  getHttpOption(){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + JSON.parse(this.tokenStorage.getToken()).token
      })
      , 'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };return this.httpOptions;
  }

  findAll(page: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.API_URL_BOOKING + '/List?page=' + page);
  }

  searchBookingTicket(pageable: number, name: string, code: string, member_id: string, phone: string): Observable<any> {
    return this.http.get<Transaction[]>(this.API_URL_BOOKING + '/Search?pageable=' + pageable + '&code=' + code + '&name=' + name + '&member_id=' + member_id + '&phone=' + phone, this.getHttpOption());
  }

  findById(id: number): Observable<any> {
    return this.http.get<Transaction>(this.API_URL_BOOKING + "/Confirm/" + id, this.getHttpOption())
  }

  acceptTicket(transaction : Transaction){
    return this.http.patch<Transaction>(this.API_URL_BOOKING + "/Update", transaction, this.getHttpOption())
  }
}
