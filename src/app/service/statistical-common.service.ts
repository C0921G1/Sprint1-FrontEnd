import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import { TokenStorageService } from './security/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticalCommonService {
  httpOptions: any;

  constructor(private httpClient: HttpClient,
              private tokenStorage: TokenStorageService) {
    this.listTopFilm = [];
    this.listTopMember = [];
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + JSON.parse(this.tokenStorage.getToken()).token
      })
      , 'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }
  API_URL = 'http://localhost:8080/statistic';
  private listTopFilm: any;
  private listTopMember: any;

  getAllTopFilm(): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + '/film', this.httpOptions)
  }

  getAllTopMember(quarter: string, year: string): Observable<any> {
    if (quarter == undefined && year == undefined) {
      return this.httpClient.get<any>(this.API_URL+'/member', this.httpOptions)
    } else if (quarter == undefined && year != undefined) {
      return this.httpClient.get<any>(this.API_URL + '/member' + '?&year=' + year, this.httpOptions)
    } else
      return this.httpClient.get<any>(this.API_URL + '/member' + '?quarter=' + quarter + '&year=' + year, this.httpOptions)
  }

  getYear(): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + '/member' + '/year', this.httpOptions)
  }

  getInforAdmin(id: string): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + '/common/'+id, this.httpOptions)
  }

  getRevenueByMonth(): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + '/common/revenue', this.httpOptions)
  }
}
