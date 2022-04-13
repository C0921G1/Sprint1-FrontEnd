import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TokenStorageService} from '../security/token-storage.service';
import {Observable} from 'rxjs';
import {SeatType} from '../../model/seat-type';

@Injectable({
  providedIn: 'root'
})
export class SeatTypeService {
  API_URL = 'http://localhost:8080/c09/user/seatType';
  httpOptions: any;

  constructor(private httpClient: HttpClient,
              private tokenStorage: TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + JSON.parse(this.tokenStorage.getToken()).token
      })
      , 'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  public findById(id: number): Observable<any> {
    return this.httpClient.get<SeatType>(this.API_URL + '/' + id, this.httpOptions);
  }
}
