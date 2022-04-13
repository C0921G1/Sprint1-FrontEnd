import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TokenStorageService} from './security/token-storage.service';
import {Observable} from 'rxjs';
import {MemberNhannt} from '../model/member-nhannt';
import {TradingHistory} from '../model/trading-history';
import {Member} from '../model/member';
import {City} from '../model/city';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private GETMEMBER_INFOR_API = 'http://localhost:8080/c09/user/member';
  private HISTORY_POINT_URL = 'http://localhost:8080/c09/user/member/viewHistory';
  private CHANGE_PASSWORD_URL = 'http://localhost:8080/c09/user/member/changePassword?';
  private API_URL = 'http://localhost:8080/c09'


  httpOptions: any;

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

  changePassword(id: string, oldPass: string, newPass: string, member: Member) : Observable<any> {
    return this.http.patch<void>(this.CHANGE_PASSWORD_URL + 'id=' + id + '&oldPass=' + oldPass + '&newPass=' + newPass, member, this.getHttpOption());
  }

  findMemberById(id: string): Observable<any> {
    return this.http.get<Member>(this.GETMEMBER_INFOR_API + '/getDetail/' + id, this.getHttpOption());
  }

  updateMember(member: Member): Observable<any> {
    return this.http.patch<void>(this.GETMEMBER_INFOR_API + '/updateMember', member, this.getHttpOption());
  }

  viewPointHistory(id: string, searchType: number, startDate: string, endDate: string, pageNo: number): Observable<any> {
    if (searchType == 0) {

      return this.http.get<Member>(
        this.HISTORY_POINT_URL + '/gained/' + id + '?startDate=' + startDate + '&endDate=' + endDate + '&pageNo=' + pageNo, this.getHttpOption());
    }
    return this.http.get<Member>(
      this.HISTORY_POINT_URL + '/used/' + id + '?startDate=' + startDate + '&endDate=' + endDate + '&pageNo=' + pageNo, this.getHttpOption());
  }

  getCityList(): Observable<any> {
    return this.http.get<City[]>(this.GETMEMBER_INFOR_API + '/getCity' , this.getHttpOption());
  }

//create member NhanNT
  createMember(member: MemberNhannt): Observable<void> {
    return this.http.post<void>(this.API_URL + '/public/member', member);
  }

//get historyList NhanNT
  getTradingHistory(page: number, id: string, name: string): Observable<any> {
    return this.http.get<TradingHistory[]>(this.API_URL + '/user/member/history?' + 'page=' + page + '&memberID=' + id + '&filmName=' + name, this.getHttpOption());
  }

//findMemberByEmail NhanNT
  checkExist(email: string): Observable<any> {

    return this.http.get<any>(this.API_URL + '/public/member/email?email=' + email);

  }
}
