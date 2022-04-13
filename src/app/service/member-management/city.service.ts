import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {City} from '../../model/city';
import {TokenStorageService} from '../security/token-storage.service';

const connect_backend_url = 'http://localhost:8080/c09/admin/member-management';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private API_URL = 'http://localhost:8080/c09/public/member/city';
  httpOptions: any;
  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) {

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
  //get all cities - KhanhLDQ
  getAllCities(): Observable<any> {
    return this.http.get<City[]>(connect_backend_url + '/city-list', this.getHttpOption());
  }

  //get city list NhanNT
  getCityList(): Observable<City[]> {
    return this.http.get<City[]>(this.API_URL);
  }

  //get city list NhanNT
  getCityById(id: any): Observable<City> {
    return this.http.get<City>(this.API_URL + '/' + id);
  }
}
