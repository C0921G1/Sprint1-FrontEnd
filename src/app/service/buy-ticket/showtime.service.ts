import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenStorageService} from '../security/token-storage.service';
import {ShowTime} from '../../model/ShowTime';

@Injectable({
  providedIn: 'root'
})
export class ShowtimeService {

  API_URL = 'http://localhost:8080/c09/public/';

  constructor(private httpClient: HttpClient,
              private tokenStorage: TokenStorageService) {
  }

  public getShowTimeByFilmId(filmId: number, date: string): Observable<any> {
    return this.httpClient.get<ShowTime[]>(this.API_URL + 'showtime/by-film?filmId=' + filmId + '&date=' + date);
  }

  public findById(id: number): Observable<any> {
    return this.httpClient.get<ShowTime>(this.API_URL + 'showtime/' + id);
  }
}

