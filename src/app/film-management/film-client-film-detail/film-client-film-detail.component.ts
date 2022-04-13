import {Component, OnInit, Pipe} from '@angular/core';
import {FilmServiceService} from '../../service/film/film-service.service';
import {Film} from '../../model/film';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-film-client-film-detail',
  templateUrl: './film-client-film-detail.component.html',
  styleUrls: ['./film-client-film-detail.component.css']
})
export class FilmClientFilmDetailComponent implements OnInit {
  film: Film;
  id: number
  constructor(private filmServiceService: FilmServiceService,
              private activatedRoute: ActivatedRoute,
              public sanitizer: DomSanitizer) { }


  transform() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.film.trailer);
  }
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
      this.findById(this.id);

  }


  findById(id:number){
    this.filmServiceService.findByIdFilm(id).subscribe(value => {
        this.film = value;
    })
  }

}
