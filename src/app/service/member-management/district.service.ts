import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {District} from '../../model/district';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {
  private API_URL = 'http://localhost:8080/c09/public/member/district'
  constructor(private http:HttpClient) { }

//get district list NhanNT
  getDistrictList(id:any): Observable<District[]>{
    return this.http.get<District[]>(this.API_URL +'/'+id)
  }
}
