import { Component, OnInit } from '@angular/core';
import {FilmManagementDeleteComponent} from '../film-management-delete/film-management-delete.component';
import {Film} from '../../model/Film';
import {FilmServiceService} from '../../service/film/film-service.service';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {DateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-film-management-list',
  templateUrl: './film-management-list.component.html',
  styleUrls: ['./film-management-list.component.css']
})
export class FilmManagementListComponent implements OnInit {
  films: Film[];
  page = 0;
  name = '';
  startDate: string;
  endDate: string;
  totalPagination: number;
  totalElement: number
  startDateFormat='';
  endDateFormat='';
  constructor(private filmServiceService: FilmServiceService,
              private dialog: MatDialog, private router: Router,
              private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
  }

  ngOnInit(): void {
    this.getFilmList();
  }

  public getFilmList(){
    this.page = 0;
    this.filmServiceService.getListFilmManagement(this.page,this.name,this.startDateFormat,this.endDateFormat).subscribe(value => {
      if (value !=null){
        this.films = value['content'];
        this.totalPagination = value['totalPages'];
        this.totalElement = value['totalElements'];
      }else {
        this.films = [];
        this.totalElement=0;
        this.totalPagination=0;
      }
    },error => {
    });
  }

  public openDialog(id: number): void{
    const dialogRef = this.dialog.open(FilmManagementDeleteComponent, {
      width: 'max-content',
      height: 'max-content',
      data: id,

    });

    dialogRef.afterClosed().subscribe(result => {
      this.name = '';
      this.endDate = null;
      this.startDate = null;
      this.ngOnInit();
    });
  }

  nextPage() {
    window.scroll(0,0);
    if (this.page <= this.totalPagination) {
      this.page = this.page + 1;
      this.filmServiceService.getListFilmManagement(this.page,this.name,this.startDateFormat,this.endDateFormat).subscribe(data => {
        this.films = data['content'];
      });
    }
  }

  previousPage() {
    window.scroll(0,0);
    this.page = this.page - 1;
    if (this.page == 0 || this.page < 0) {
      this.page = 0;
      this.ngOnInit();
    } else {
      this.filmServiceService.getListFilmManagement(this.page,this.name,this.startDateFormat,this.endDateFormat).subscribe(data => {
        this.films = data['content'];
      })
    }
  }

  search() {
    if(this.startDate !=null || this.startDate != undefined){
      this.startDateFormat = new Date(this.startDate).toLocaleDateString('fr-CA');
    }else {
      this.startDateFormat = '';
    }
    if (this.endDate !=null || this.endDate != undefined) {
      this.endDateFormat = new Date(this.endDate).toLocaleDateString('fr-CA');
    } else {
      this.endDateFormat = '';
    }
    console.log(this.startDateFormat,this.endDateFormat,this.name);
    this.page =0;
    this.getFilmList();

  }
}
