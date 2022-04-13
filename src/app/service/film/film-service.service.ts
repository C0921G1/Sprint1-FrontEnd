import {Injectable} from '@angular/core';

import {HttpClient, HttpEvent, HttpHeaders} from '@angular/common/http';
import {Film} from '../../model/film';
import {Observable} from 'rxjs';
import {TokenStorageService} from '../security/token-storage.service';
import {FilmType} from '../../model/Film-type';

@Injectable({
  providedIn: 'root'
})
export class FilmServiceService {

  film: Film;
  API_URL_LIST = 'http://localhost:8080/c09/public/film';

  httpOptions: any;

  constructor(private httpClient: HttpClient, private tokenStorage: TokenStorageService) {

  }

  public getHttpOptions(): any {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + JSON.parse(this.tokenStorage.getToken()).token
      })
      , 'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  public getListFilmClient(seeMore: number, page: number, actor: string, name: string, typeFilm: string, filmStatus: string): Observable<any> {
    return this.httpClient.get<any>(this.API_URL_LIST + '/list-client?seeMore=' + seeMore + '&page=' + page + '&actor='
      + actor + '&name=' + name + '&typeFilm=' + typeFilm + '&filmStatus=' + filmStatus);
  }

  public getAllFilmList(): Observable<any> {
    return this.httpClient.get<Film[]>(this.API_URL_LIST + '/filmList');
  }

  public findById(id: number): Observable<any> {
    return this.httpClient.get<Film>(this.API_URL_LIST + '/filmList/' + id);
  }

  public findByIdFilm(id: number):Observable<Film>{
    return this.httpClient.get<Film>(this.API_URL_LIST  +"/findById/"+id);
  }

  /*TaiLM - Tìm kiếm film*/
  public getListFilmManagement(page: number, name: string, startDate: string, endDate: string){
    return this.httpClient.get<Film[]>(this.API_URL_LIST + '/list-management?page=' +
      page + '&name=' + name + '&startDate=' + startDate + '&endDate=' + endDate);
  }

  /*TaiLM - Xóa film theo id*/
  public deleteFilmManagement(id: number): Observable<void>{
    return this.httpClient.get<void>(this.API_URL_LIST + '/delete/' + id);
  }

  // CaHM them phim
  createFilm(film:Film){
    return this.httpClient.post(this.API_URL_LIST + "/createFilm",film )
  }

  //CaHM update Film
  updateFilm(id: number, film:Film){
    return this.httpClient.patch(this.API_URL_LIST +"/"+ id,film )
  }
  //CaHM get List FilmType
  getAllFilmType():Observable<FilmType[]>{
    return this.httpClient.get<FilmType[]>(this.API_URL_LIST + '/filmType');
  }

}
