import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {finalize} from 'rxjs/operators';
import {formatDate} from '@angular/common';
import {AngularFireStorage} from '@angular/fire/storage';

import {differenceInDays} from 'date-fns';
import Swal from 'sweetalert2';
import {FilmServiceService} from '../../service/film/film-service.service';
import {Film} from '../../model/Film';
import {FilmType} from '../../model/Film-type';
import {ValidateDate} from '../../model/validate-date';



@Component({
  selector: 'app-film-management-create',
  templateUrl:'./film-management-create.component.html',
  styleUrls: ['./film-management-create.component.css']
})
export class FilmManagementCreateComponent implements OnInit {
  flag = false;
  flag1 = false;
  flag2 = false;
  submitted = false;

  url: any;
  film: any;
  filmObj: Film;
  fimTypeList: FilmType[];
  filmTypeNew = [];
  selectedImage: File;
  validateDate: ValidateDate = new ValidateDate();

  // CaHM tạo form
  formFilm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    duration: new FormControl('', [Validators.required, Validators.pattern('\\d*'), Validators.min(10), Validators.max(240)]),
    // FormGroup validate ngày bắt đầu và kết thúc
    groupFilmDate: new FormGroup({
      startDate: new FormControl('', [Validators.required,
        this.validateDate.checkStartDate]),
      endDate: new FormControl('', [Validators.required])
    }, this.checkFilmDate),
    filmType: new FormControl(null,),
    actor: new FormControl('', [Validators.required]),
    director: new FormControl('', [Validators.required, Validators.pattern('^([A-ZĐ][a-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ]+)( [A-ZĐ][a-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ]*)*$')]),
    studio: new FormControl('', [Validators.required, Validators.pattern('PC\\-0[1-4]')]),
    image: new FormControl(''),
    trailer: new FormControl('', [Validators.required]),
    version: new FormControl('', [Validators.required, Validators.pattern('[2-3]D')]),
    filmTypeNew: new FormControl('')

  });



  constructor(private filmService: FilmServiceService,
              private router: Router,
              @Inject(AngularFireStorage) private storage: AngularFireStorage,
  ) {

  }

  ngOnInit(): void {
    this.filmService.getAllFilmType().subscribe(value => {
      this.fimTypeList = value;

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
  }

// bat sự kiện checkbox
  onChangeFood(event) {
    for (let i = 0; i < this.filmTypeNew.length; i++) {
      if (this.filmTypeNew[i] == event) {
        this.filmTypeNew.splice(i, 1);
        console.log(this.filmTypeNew.toString());
        return null;

      }
    }
    this.filmTypeNew.push(event);
    this.flag = false;
  }


// CaHM thêm mới film
  create() {
    this.submitted = true;
    if(this.formFilm.valid){

    // if để validate img và checkbox
    if (this.filmTypeNew.toString() == '') {
      this.flag = true;

    }
    if (this.selectedImage == null) {
      this.flag1 = true;
    }
    if (this.filmTypeNew.toString() != '' && this.selectedImage != null) {
      this.flag = false;
      // update anh lên firebase
      this.flag2 = true;
      const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
      const fileRef = this.storage.ref(nameImg);

      this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {


          //  down link từ firabase và path vào image
          fileRef.getDownloadURL().subscribe((url) => {

            //set link vao thuoc tinh anh
            this.formFilm.patchValue({image: url});
            // gán chuỗi filmTypeNew qua thuộc tính filmTypeNew cửa form
            this.formFilm.patchValue({filmTypeNew: this.filmTypeNew.toString()});

            //bien form thanh object assign
            this.filmObj = Object.assign({}, this.formFilm.value);
            this.filmObj.startDate = this.formFilm.value.groupFilmDate.startDate;
            this.filmObj.endDate = this.formFilm.value.groupFilmDate.endDate;
            console.log(this.filmObj);
            // tiến hành thêm mới
            this.filmService.createFilm(this.filmObj).subscribe(() => {

              // this.SpinnerService.hide();


              this.router.navigateByUrl('/film/list-manager').then(r => Swal.fire({
                  icon: 'success',
                  title: 'Thêm mới thành công'
                  // text: 'thêm đối tượng:' + ,
                })
              );
            }, error => {
            },);

          });
        })
      ).subscribe();
    }

  }
  }


  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }

}


