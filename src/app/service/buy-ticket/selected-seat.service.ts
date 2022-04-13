import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SelectedSeat} from '../../model/selected-seat';
import {TokenStorageService} from '../security/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SelectedSeatService {
  API_URL = 'http://localhost:8080/c09/user/selectedSeat';
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

  public getAllSelectedSeatByShowTimeId(id: number): Observable<any> {
    return this.httpClient.get<SelectedSeat[]>(this.API_URL + '/' + id, this.httpOptions);
  }
}
