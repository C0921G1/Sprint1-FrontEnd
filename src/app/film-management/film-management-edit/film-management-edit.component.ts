import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {formatDate} from '@angular/common';
import {differenceInDays} from 'date-fns';
import Swal from "sweetalert2";
import {FilmServiceService} from '../../service/film/film-service.service';
import {FilmType} from '../../model/Film-type';
import {Film} from '../../model/Film';

@Component({
  selector: 'app-film-management-edit',
  templateUrl: './film-management-edit.component.html',
  styleUrls: ['./film-management-edit.component.css']
})
export class FilmManagementEditComponent implements OnInit {
  url: any;
  flag4 = false
  flag3 = true;
  flag2 = false;
  fimTypeList: FilmType[];
  film: any;
  id: number;
  filmTypeNewArr = [];
  private filmTypeNew = [];
  private selectedImage: any = null;
  notChoose = [];
  filmTypeChoose = [];
  startDate = '';
  filmObj: Film;
// CaHM tạo FormGroup
  formFilm: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    duration: new FormControl('', [Validators.required, Validators.pattern('\\d*'), Validators.min(10), Validators.max(240)]),

    groupFilmDate: new FormGroup({
      startDate:new FormControl("",[Validators.required]),
      endDate:new FormControl("",[Validators.required])
    }, this.checkFilmDate),
    filmType: new FormControl(null),
    actor: new FormControl('', [Validators.required]),
    director: new FormControl('', [Validators.required, Validators.pattern('^([A-ZĐ][a-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ]+)( [A-ZĐ][a-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ]*)*$')]),
    studio: new FormControl('', [Validators.required, Validators.pattern('PC\\-0[1-4]')]),
    image: new FormControl(''),
    trailer: new FormControl('', [Validators.required]),
    version: new FormControl('', [Validators.required, Validators.pattern('[4,8]K')]),
    filmTypeNew: new FormControl(''),
    flagDelete: new FormControl(''),

  });

  constructor(private filmService: FilmServiceService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              @Inject(AngularFireStorage) private storage: AngularFireStorage,
  ) {
  }

  ngOnInit(): void {
    this.filmService.getAllFilmType().subscribe(value => {
      this.fimTypeList = value;
      this.id = this.activatedRoute.snapshot.params.id;
      this.getChooseTypeFilm();
    });

  }

  // check so sánh hai ngày nhập vào
  checkFilmDate(abstractControl: AbstractControl): any {
    const startDate = abstractControl.value.startDate;
    const endDate = abstractControl.value.endDate;

    const startToDate = new Date(startDate);
    const endToDate = new Date(endDate);
    const diffDays = differenceInDays(endToDate, startToDate);
    return (diffDays > 0) ? null : {notSuitableDate: true};
  }


// CaHm bắt sự kiện checkbox
  onChangeFood(event) {
    for (let i = 0; i < this.filmTypeChoose.length; i++) {
      if (this.filmTypeChoose[i] == event) {
        this.filmTypeChoose.splice(i, 1);
        //  console.log(this.filmTypeChoose);
        return null;
      }
    }
    this.filmTypeChoose.push(event);
    //console.log(this.filmTypeChoose);

  }


  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
    if (event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
    }
    this.flag3 = false;
    this.flag4 = true;
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }


//  CaHM update film
  update() {
    // set th1
    if (this.selectedImage == null && this.filmTypeChoose.toString() == '') {
      this.flag2 = true ;
      //bien form thanh object assign
      this.filmObj = Object.assign({},this.formFilm.value);

      this.filmObj.filmTypeNew = this.filmTypeNewArr.toString();
      this.filmObj.startDate = this.formFilm.value.groupFilmDate.startDate
      this.filmObj.endDate = this.formFilm.value.groupFilmDate.endDate

      this.filmService.updateFilm(this.filmObj.id, this.filmObj).subscribe(() => {
        this.router.navigateByUrl("/film/list-manager").then(r => Swal.fire({
            icon: 'success',
            title: 'Chỉnh sửa thành công'
            // text: 'thêm đối tượng:' + ,
          })
        );
      });
      // set th2
    } else if (this.selectedImage == null) {
      this.flag2 = true ;

      this.formFilm.patchValue({filmTypeNew: this.filmTypeChoose.toString()});

      //bien form thanh object assign
      this.filmObj = Object.assign({},this.formFilm.value);

      this.filmObj.startDate = this.formFilm.value.groupFilmDate.startDate
      this.filmObj.endDate = this.formFilm.value.groupFilmDate.endDate

      this.filmService.updateFilm(this.filmObj.id, this.filmObj).subscribe(() => {
        this.router.navigateByUrl("/film/list-manager").then(r => Swal.fire({
            icon: 'success',
            title: 'Chỉnh sửa thành công'
            // text: 'thêm đối tượng:' + ,
          })
        );

      });
      //set th3
    } else if (this.filmTypeNewArr.toString() == '') {
      this.flag2 = true ;
      console.log( this.formFilm.value);
      const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
      const fileRef = this.storage.ref(nameImg);
      this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {

          fileRef.getDownloadURL().subscribe((url) => {


            this.formFilm.patchValue({image: url});
            this.filmObj.filmTypeNew = this.filmTypeNewArr.toString();
            //bien form thanh object assign
            this.filmObj = Object.assign({},this.formFilm.value);

            this.filmObj.startDate = this.formFilm.value.groupFilmDate.startDate
            this.filmObj.endDate = this.formFilm.value.groupFilmDate.endDate

            this.filmService.updateFilm(this.filmObj.id, this.filmObj).subscribe(() => {
              this.router.navigateByUrl("/film/list-manager").then(r => Swal.fire({
                  icon: 'success',
                  title: 'Chỉnh sửa thành công'
                  // text: 'thêm đối tượng:' + ,
                })
              );
            });

          });
        })
      ).subscribe();
    }
    // set th4
    else {
      this.flag2 = true ;
      const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
      const fileRef = this.storage.ref(nameImg);
      this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          this.formFilm.patchValue({filmTypeNew: this.filmTypeChoose.toString()});
          fileRef.getDownloadURL().subscribe((url) => {
            this.formFilm.patchValue({image: url});


            //bien form thanh object assign
            this.filmObj = Object.assign({},this.formFilm.value);

            this.filmObj.startDate = this.formFilm.value.groupFilmDate.startDate
            this.filmObj.endDate = this.formFilm.value.groupFilmDate.endDate

            this.filmService.updateFilm(this.filmObj.id, this.filmObj).subscribe(() => {
              this.router.navigateByUrl("/film/list-manager").then(r => Swal.fire({
                  icon: 'success',
                  title: 'Chỉnh sửa thành công'
                  // text: 'thêm đối tượng:' + ,
                })
              );

            });

          });
        })
      ).subscribe();
    }
  };


  getChooseTypeFilm() {
    // lấy film theo id
    this.filmService.findByIdFilm(this.id).subscribe(value => {
      // gán giá trị value vào đối tượng film
      this.film = value;
      // gán từng thuộc tình film cho form film
      this.formFilm.patchValue({id: this.film.id});
      this.formFilm.patchValue({name: this.film.name});
      this.formFilm.patchValue({duration: this.film.duration});
      this.formFilm.get('groupFilmDate.startDate').setValue(this.film.startDate)
      this.formFilm.get('groupFilmDate.endDate').setValue(this.film.endDate)
      this.formFilm.patchValue({filmType: this.film.filmType});
      this.formFilm.patchValue({actor: this.film.actor});
      this.formFilm.patchValue({director: this.film.director});
      this.formFilm.patchValue({studio: this.film.studio});
      this.formFilm.patchValue({image: this.film.image});
      this.formFilm.patchValue({trailer: this.film.trailer});
      this.formFilm.patchValue({version: this.film.version});
      this.formFilm.patchValue({flagDelete: this.film.flagDelete});

      // gán giá trị thuộc tính filmTypeNew từ film vào mảng filmTypeNewArr và push vào filmTypeChoose dể hiển thị trên form
      this.filmTypeNewArr = this.film.filmTypeNew.replace().split(',');
      for (let i = 0; i < this.filmTypeNewArr.length; i++) {
        this.filmTypeChoose.push(this.filmTypeNewArr[i]);
      }
      // gọi giá trị của filmType chưa chọn để hiển thị trên form
      this.TypeFilmLength();
    });
  }

  // push filmType chưa chọn vào mảng mới
  TypeFilmLength() {
    for (let i = 0; i < this.fimTypeList.length; i++) {
      if (this.filmTypeNewArr.indexOf(this.fimTypeList[i].name) == -1) {
        this.notChoose.push(this.fimTypeList[i].name);
      }
    }
  }

}
