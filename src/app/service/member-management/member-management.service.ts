import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import {Member} from "../../model/member";
import {TokenStorageService} from '../security/token-storage.service';

const connect_backend_url = 'http://localhost:8080/c09/admin/member-management';

@Injectable({
  providedIn: 'root'
})
export class MemberManagementService {

  httpOptions: any;

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + JSON.parse(this.tokenStorage.getToken()).token
      })
      , 'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }



  //get all members with pagination - KhanhLDQ
  getAllMembers(page: number): Observable<any> {
    return this.http.get<Member[]>(connect_backend_url + '/member-list?page=' + page, this.httpOptions);
  }

  //get member by id - KhanhLDQ
  getMemberById(id: string): Observable<any> {
    return this.http.get<Member>(connect_backend_url + '/member-list/info/' + id, this.httpOptions);
  }

  //update member by id - KhanhLDQ
  updateMember(id: string, member: Member): Observable<any> {
    return this.http.patch<Member>(connect_backend_url + '/member-list/update/' + id, member, this.httpOptions);
  }

  //search members by name and point range - KhanhLDQ
  searchMembersByNameAndPointRange(page: number, name: string, firstValue: number, secondValue: number): Observable<any> {
    return this.http.get<Member[]>(connect_backend_url +
      '/member-list/search-point-range?page=' + page + '&name=' + name + '&firstValue=' + firstValue + '&secondValue=' + secondValue, this.httpOptions);
  }

  //search members by name and point default - KhanhLDQ
  searchMembersByNameAndPointDefault(page: number, name: string): Observable<any> {
    return this.http.get<Member[]>(connect_backend_url +
      '/member-list/search-point-default?page=' + page + '&name=' + name, this.httpOptions);
  }

}
