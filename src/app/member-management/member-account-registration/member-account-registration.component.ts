import {Component, Inject, OnInit} from '@angular/core';
import {MemberNhannt} from '../../model/member-nhannt';
import {City} from '../../model/city';
import {District} from '../../model/district';
import {Ward} from '../../model/ward';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {CityService} from '../../service/member-management/city.service';
import {DistrictService} from '../../service/member-management/district.service';
import {Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import Swal from 'sweetalert2';
import {formatDate} from '@angular/common';
import {WardService} from '../../service/ward.service';
import { MemberService } from 'src/app/service/member.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {SpinnerNhanComponent} from './spinner-nhan/spinner-nhan.component';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-member-account-registration',
  templateUrl: './member-account-registration.component.html',
  styleUrls: ['./member-account-registration.component.css']
})
export class MemberAccountRegistrationComponent implements OnInit {
  submitted = false;
  memberObj: MemberNhannt;
  cityList: City[] = [];
  districtList: District[] = [];
  wardList: Ward[] = [];
  memberForm: FormGroup;
  selectedImage: any = "";
  imageThis = "assets/img/avatar-register.png";
  observableSpin= new Observable(this.myObservable);
  cityObj: City;
  districtObj: District;

  errors: any;

  constructor(private cityService: CityService,
              private districtService: DistrictService,
              private wardService: WardService,
              private memberService: MemberService,
              private dialog: MatDialog,
              private router: Router,
              @Inject(AngularFireStorage) private storage: AngularFireStorage) {
    // let observableSpin= new Observable(this.myObservable);
    // this.showProgressSpinnerUntilExecuted(observableSpin);

  }

  ngOnInit(): void {

    this.cityService.getCityList().subscribe(city => {
      this.cityList = city;
      // console.log(city)

      this.memberForm = new FormGroup({
        image: new FormControl('', [Validators.required,]),
        name: new FormControl('', [Validators.required,Validators.pattern("^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$"),Validators.maxLength(50)]),
        // name: new FormControl('', [Validators.required]),
        phone: new FormControl('', [Validators.required, Validators.pattern("^(\\(84\\)\\+|0)(90|91)(\\d){7}$")]),
        gender: new FormControl('', [Validators.required,]),
        email: new FormControl('', [Validators.required,Validators.pattern("^[A-Za-z0-9._]+[@][A-Za-z0-9._]+[.][A-Za-z0-9._]+$")]),

        passwordFormGroup: new FormGroup({
          password: new FormControl('', [Validators.required,Validators.pattern("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$"),]),
          confirmPassword: new FormControl('', [Validators.required,]),
        }, this.comparePassword),

        cityThis: new FormControl(''),
        district: new FormControl(''),
        ward: new FormControl('', [Validators.required,]),
        address: new FormControl('', [Validators.required,]),
        dateOfBirth: new FormControl('', [Validators.required,]),
        identityNumber: new FormControl('', [Validators.required,]),
        check: new FormControl('', [Validators.required,])
      })
    })
    // console.log(this.memberForm.value.gender);
  }
  myObservable(observer) {
    setTimeout(() => {
      observer.next("done waiting for 2 sec");
      observer.complete();
    }, 2000);
  }
  showProgressSpinnerUntilExecuted(observable: Observable<Object>) {
    let dialogRef: MatDialogRef<SpinnerNhanComponent> = this.dialog.open(SpinnerNhanComponent, {
      panelClass: 'transparentSpin',
      disableClose: true,
    });
    let subscription = observable.subscribe(
      (response: any) => {
        subscription.unsubscribe();
        //handle response
        console.log(response);
        dialogRef.close();
      },
      (error) => {
        subscription.unsubscribe();
        //handle error
        dialogRef.close();
      }
    );
  }

  //NhanNT check password
  comparePassword(compare: AbstractControl): any {
    const validate = compare.value;
    // console.log(validate.password + "ok");
    return (validate.password === validate.confirmPassword) ? null : {notMatch: true};
  }



  //get city NhanNT
  getCityToDistrictNhanNT(event: number): any {
    console.log("Shit");
    return this.districtService.getDistrictList(event).subscribe(district => {
      this.districtList = district;
    })
  }

  //get district  NhanNT
  getDistrictToWardNhanNT(event2: number): any {
    console.log("Fuvk");
    return this.wardService.getWardList(event2).subscribe(ward => {
      this.wardList = ward;
    })
  }

  //create member NhanNT
  onSubmit() {
    this.submitted = true;

// img upload
    const nameImg = this.getCurrentDateTime() + this.selectedImage.name;

    const fileRef = this.storage.ref(nameImg);

    this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {

          this.memberForm.patchValue({image: url});

          // Call API to create vaccine
          if (this.memberForm.valid) {
            this.memberObj = Object.assign({}, this.memberForm.value);
            this.memberObj.cityId = this.memberForm.value.cityThis;


            this.memberObj.password = this.memberForm.value.passwordFormGroup.password;

            this.showProgressSpinnerUntilExecuted(this.observableSpin);
            this.memberService.createMember(this.memberObj).subscribe(() => {
                Swal.fire({
                    position: 'top',
                    background: '#f8f9fa',
                    width: 400,
                    heightAuto: true,
                    icon: 'success',
                    title: 'Bạn đã đăng ký thành công!',
                    toast: true,
                    showConfirmButton: false,
                    timer: 3000,
                }

                );
                this.router.navigateByUrl('');
              }
              , error => {

                // console.log(error);
                // console.log(error.error);
                this.errors = error.error;

                for (let i = 0; i < this.errors.length; i++) {
                  console.log("ok")
                  if (this.errors[i].field == "dateOfBirth") {
                    document.getElementById("checkAge").textContent = this.errors[i].defaultMessage;
                  }
                  if (this.errors[i].field == "existedEmail") {

                    document.getElementById("email-duplicate").textContent = this.errors[i].defaultMessage;
                  }

                }
              }
            );
          }

        });
      })
    ).subscribe();


  }

  // img support NhanNT
  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
    if (event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.imageThis = event.target.result;
      };
    }
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyy', 'en-US');
  }
}
