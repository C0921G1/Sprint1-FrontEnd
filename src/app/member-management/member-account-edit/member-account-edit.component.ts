import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {City} from '../../model/city';
import {MemberManagementService} from '../../service/member-management/member-management.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {CityService} from '../../service/member-management/city.service';
import {differenceInYears} from 'date-fns';
import Swal from 'sweetalert2';
import {Member} from '../../model/member';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {formatDate} from '@angular/common';


@Component({
  selector: 'app-member-account-edit',
  templateUrl: './member-account-edit.component.html',
  styleUrls: ['./member-account-edit.component.css']
})
export class MemberAccountEditComponent implements OnInit {

  //turn on front-end validate - KhanhLDQ
  memberUpdateForm: FormGroup = new FormGroup({
    id: new FormControl(),

    name: new FormControl('',
      Validators.compose([Validators.required, Validators.pattern('^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$'),
        Validators.minLength(8)])),

    gender: new FormControl(),

    phone: new FormControl('',
      Validators.compose([Validators.required, Validators.pattern('^(\\(84\\)\\+|0)(90|91)(\\d){7}$')])),

    email: new FormControl('',
      Validators.compose([Validators.required, Validators.email])),

    address: new FormControl('',
      Validators.compose([Validators.required])),

    point: new FormControl(),

    image: new FormControl(),

    dateOfBirth: new FormControl('',
      Validators.compose([Validators.required, this.checkAgeMember])),

    identityNumber: new FormControl('',
      Validators.compose([Validators.required,
        Validators.pattern('^((\\d){9}|(\\d){12})$')])),

    city: new FormControl(),

    account: new FormControl()
  });

  //turn off front-end validate - KhanhLDQ
  // memberUpdateForm: FormGroup = new FormGroup({
  //   id: new FormControl(),
  //
  //   name: new FormControl(),
  //
  //   gender: new FormControl(),
  //
  //   phone: new FormControl(),
  //
  //   email: new FormControl(),
  //
  //   address: new FormControl(),
  //
  //   point: new FormControl(),
  //
  //   image: new FormControl(),
  //
  //   dateOfBirth: new FormControl(),
  //
  //   identityNumber: new FormControl(),
  //
  //   city: new FormControl()
  // });

  cities: City[];
  id: string;
  buttonFLag: boolean = false;
  errors: any;
  imageThis = '';

  //show on - off back-end errors
  // nameBlank: boolean = false;

  constructor(
    private memberManagementService: MemberManagementService,
    private cityService: CityService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    @Inject(AngularFireStorage) private storage: AngularFireStorage
  ) {
  }

  ngOnInit(): void {
    this.cityService.getAllCities().subscribe(value => {
      this.cities = value;
      // console.log(value);

      this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
        this.id = paramMap.get('id');
        this.getMemberById(this.id);
      });
    });
  }

  //get member by id - KhanhLDQ
  getMemberById(id: string) {
    return this.memberManagementService.getMemberById(id).subscribe(value => {
      console.log(value);

      this.imageThis = value.image;
      console.log(this.imageThis);

      this.memberUpdateForm.setValue(value);
      // console.log(this.memberUpdateForm);
    }, error => {
      console.log(error);
    });
  }

  //age member >= 16 or <= 100 - KhanhLDQ
  checkAgeMember(abstractControl: AbstractControl): any {
    const formValue = abstractControl.value;
    const now = new Date();
    const dateOfBirth = new Date(formValue);

    const years = differenceInYears(now, dateOfBirth);
    // console.log(years);

    return (years >= 16 && years <= 100) ? null : {notSuitableAge: true};
  }

  selectedImage: any = '';


  // img support KhanhLDQ
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

  //update member by id - KhanhLDQ
  updateMember() {
    const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
    const fileRef = this.storage.ref(nameImg);

    const member = this.memberUpdateForm.value;
    this.buttonFLag = true;
    console.log(this.selectedImage.name+ "hình update");
    if (this.selectedImage.name == null) {
      if (this.memberUpdateForm.valid) {

        member.image = this.imageThis;
        console.log(this.imageThis);
        console.log("-----------");
        console.log(member.image);
        this.memberManagementService.updateMember(this.id, member).subscribe(() => {
          // console.log('update member successfully!');

          this.router.navigateByUrl('/member/list').then(r => Swal.fire(
            '' + this.id,
            'Cập nhật thành công!',
            'success'
          ));

          // this.router.navigateByUrl('/member/list').then(r => console.log('back to member list!'));

        }, error => {

          console.log(error);
          console.log(error.error);

          console.log('front-end valid / back-end-error');

          this.errors = error.error;
          for (let i = 0; i < this.errors.length; i++) {

            // console.log(this.errors[i].field);
            // console.log(this.errors[i].field == "phone");

            //need solution to solve a problem - how can show on / off the back-end errors reasonably - KhanhLDQ

            //field-name
            if (this.errors[i].field == 'name' && this.errors[i].code == 'NotBlank') {
              document.getElementById('name-not-blank').textContent = this.errors[i].defaultMessage;

              // const element = document.getElementById("name-not-blank");
              // if (element) {
              //   element.textContent = this.errors[i].defaultMessage;
              //   this.nameBlank = true;
              // }
            }

            if (this.errors[i].field == 'name' && this.errors[i].code == 'Size') {
              document.getElementById('name-size').textContent = this.errors[i].defaultMessage;
            }

            if (this.errors[i].field == 'name' && this.errors[i].code == 'Pattern') {
              document.getElementById('name-pattern').textContent = this.errors[i].defaultMessage;
            }

            //field-phone
            if (this.errors[i].field == 'phone' && this.errors[i].code == 'Pattern') {
              document.getElementById('phone-pattern').textContent = this.errors[i].defaultMessage;
            }

            if (this.errors[i].field == 'phone' && this.errors[i].code == 'NotBlank') {
              document.getElementById('phone-not-blank').textContent = this.errors[i].defaultMessage;
            }

            //field-address
            if (this.errors[i].field == 'address' && this.errors[i].code == 'NotBlank') {
              document.getElementById('address-not-blank').textContent = this.errors[i].defaultMessage;
            }

            //field-dateOfBirth
            if (this.errors[i].field == 'dateOfBirth' && this.errors[i].code == 'NotBlank') {
              document.getElementById('dateOfBirth-not-blank').textContent = this.errors[i].defaultMessage;
            }

            if (this.errors[i].field == 'dateOfBirth' && this.errors[i].code == 'dateOfBirth.age') {
              document.getElementById('dateOfBirth-not-suitable').textContent
                = 'Thành viên đăng ký phải lớn hơn 16 tuổi học bé hơn 100 tuổi!';
            }

            //field-identityNumber
            if (this.errors[i].field == 'identityNumber' && this.errors[i].code == 'NotBlank') {
              document.getElementById('identityNumber-not-blank').textContent = this.errors[i].defaultMessage;
            }

            if (this.errors[i].field == 'identityNumber' && this.errors[i].code == 'Pattern') {
              document.getElementById('identityNumber-pattern').textContent = this.errors[i].defaultMessage;
            }

          }
        });
      } else {
        console.log('invalid info / front-end');
      }
    }

    else
    {
      this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {

            this.memberUpdateForm.patchValue({image: url});

            member.image = this.memberUpdateForm.value.image;
            // console.log(member.image);
            // connect back-end / front-end
            if (this.memberUpdateForm.valid) {


              this.memberManagementService.updateMember(this.id, member).subscribe(() => {
                // console.log('update member successfully!');

                this.router.navigateByUrl('/member/list').then(r => Swal.fire(
                  '' + this.id,
                  'Cập nhật thành công!',
                  'success'
                ));

                // this.router.navigateByUrl('/member/list').then(r => console.log('back to member list!'));

              }, error => {

                console.log(error);
                console.log(error.error);

                console.log('front-end valid / back-end-error');

                this.errors = error.error;
                for (let i = 0; i < this.errors.length; i++) {

                  // console.log(this.errors[i].field);
                  // console.log(this.errors[i].field == "phone");

                  //need solution to solve a problem - how can show on / off the back-end errors reasonably - KhanhLDQ

                  //field-name
                  if (this.errors[i].field == 'name' && this.errors[i].code == 'NotBlank') {
                    document.getElementById('name-not-blank').textContent = this.errors[i].defaultMessage;

                    // const element = document.getElementById("name-not-blank");
                    // if (element) {
                    //   element.textContent = this.errors[i].defaultMessage;
                    //   this.nameBlank = true;
                    // }
                  }

                  if (this.errors[i].field == 'name' && this.errors[i].code == 'Size') {
                    document.getElementById('name-size').textContent = this.errors[i].defaultMessage;
                  }

                  if (this.errors[i].field == 'name' && this.errors[i].code == 'Pattern') {
                    document.getElementById('name-pattern').textContent = this.errors[i].defaultMessage;
                  }

                  //field-phone
                  if (this.errors[i].field == 'phone' && this.errors[i].code == 'Pattern') {
                    document.getElementById('phone-pattern').textContent = this.errors[i].defaultMessage;
                  }

                  if (this.errors[i].field == 'phone' && this.errors[i].code == 'NotBlank') {
                    document.getElementById('phone-not-blank').textContent = this.errors[i].defaultMessage;
                  }

                  //field-address
                  if (this.errors[i].field == 'address' && this.errors[i].code == 'NotBlank') {
                    document.getElementById('address-not-blank').textContent = this.errors[i].defaultMessage;
                  }

                  //field-dateOfBirth
                  if (this.errors[i].field == 'dateOfBirth' && this.errors[i].code == 'NotBlank') {
                    document.getElementById('dateOfBirth-not-blank').textContent = this.errors[i].defaultMessage;
                  }

                  if (this.errors[i].field == 'dateOfBirth' && this.errors[i].code == 'dateOfBirth.age') {
                    document.getElementById('dateOfBirth-not-suitable').textContent
                      = 'Thành viên đăng ký phải lớn hơn 16 tuổi học bé hơn 100 tuổi!';
                  }

                  //field-identityNumber
                  if (this.errors[i].field == 'identityNumber' && this.errors[i].code == 'NotBlank') {
                    document.getElementById('identityNumber-not-blank').textContent = this.errors[i].defaultMessage;
                  }

                  if (this.errors[i].field == 'identityNumber' && this.errors[i].code == 'Pattern') {
                    document.getElementById('identityNumber-pattern').textContent = this.errors[i].defaultMessage;
                  }

                }
              });
            } else {
              console.log('invalid info / front-end');
            }
          });
        })
      ).subscribe();
    }
    //memberUpdateForm.valid => chi bat duoc validate tai front-end
  }
}
