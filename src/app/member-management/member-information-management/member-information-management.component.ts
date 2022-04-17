import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Member} from '../../model/member';
import {Transaction} from '../../model/Transaction';
import {City} from '../../model/city';
import {AngularFireStorage} from '@angular/fire/storage';
import {MemberService} from '../../service/member.service';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import {finalize} from 'rxjs/operators';
import {formatDate} from '@angular/common';
import {TokenStorageService} from '../../service/security/token-storage.service';
import {CityService} from '../../service/member-management/city.service';

@Component({
  selector: 'app-member-information-management',
  templateUrl: './member-information-management.component.html',
  styleUrls: ['./member-information-management.component.css']
})
export class MemberInformationManagementComponent implements OnInit {
  emtyMgs: string = '';
  infoForm = new FormGroup({
    dateOfBirth: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.maxLength(40), Validators.minLength(10),
      Validators.pattern('^[A-Za-z0-9._]+[@][A-Za-z0-9._]+[.][A-Za-z0-9._]+$')]),
    gender: new FormControl('', [Validators.required]),
    identityNumber: new FormControl('', [Validators.required, Validators.pattern('^((\\d){9}|(\\d){12})$')]),
    image: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(50),
      Validators.pattern('^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$')]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^(84+|0)(90|91)[0-9]{7}$')]),
    // wardId: new FormControl('', [Validators.required, this.isNullCheck]),
    account: new FormControl('', [Validators.required, this.isNullCheck]),
    point: new FormControl('', [Validators.required]),
    id: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required])
  });


  imageThis: string = "assets/img/avatar-register.png";
  member: Member;
//điểm của member dùng để hiển thị
  currentMemberPoint: number;

  memberGender: number;
  searchType: number = 0;
  gainedPointPage: Transaction[];
  totalPages: number;
  gainedPage: number = 0;

  selectedImage: any = '';
  memberUser: string;
  memberId: string;
  updateCity: City;
  cityList = [];


  constructor(private memberService: MemberService,
              private activatedRoute: ActivatedRoute,
              private tokenStorageService: TokenStorageService,
              private router: Router,
              private cityService: CityService,
              @Inject(AngularFireStorage) private storage: AngularFireStorage) {
  }

  ngOnInit(): void {
    this.memberService.getCityList().subscribe(value => {
      this.cityList = value;
    });

    const id = this.tokenStorageService.getUser().member.id;
    this.memberId = id;

    this.memberService.viewPointHistory(this.memberId, this.searchType, '2000-01-01', '2025-01-01', this.gainedPage).subscribe(value => {

      if (value == null) {
        this.emtyMgs = ' Không có dữ liệu ';
        this.totalPages = 0;
      }else {
        this.gainedPointPage = value['content'];
        this.totalPages = value['totalPages'];
      }

    }, error => {
    });
    this.memberService.findMemberById(id).subscribe(value => {

      this.member = value;
      this.updateCity = this.member.city;
      this.imageThis = this.member.image;
      console.log('this . image this ' + this.imageThis);
      this.memberUser = this.member.account.username;


      //hiển thị điểm của member
      this.currentMemberPoint = this.member.point;
      //hiển thị mail của member

      this.memberUser = this.member.account.username;
      this.memberGender = this.member.gender;

      this.infoForm.patchValue(this.member);
    }, error => {
    }, () => {
      this.infoForm.patchValue(this.member);
    });
  };

  alertWithSuccess(noti: string) {
    Swal.fire({
      position: 'top',
      background: '#f8f9fa',
      width: 500,
      heightAuto: true,
      icon: 'success',
      title: 'Cập nhật thành công!',

      toast: true,
      showConfirmButton: false,
      timer: 3000,
    });
  };

  erroalert(noti) {
    Swal.fire({
      position: 'top',
      background: '#f8f9fa',
      width: 500,
      heightAuto: true,
      icon: 'error',
      title: 'Sai mật khẩu cũ!',

      toast: true,
      showConfirmButton: false,
      timer: 3000,
    });
  };

//nếu không null thì đúng, nếu object bị null thì bắt validate
  isNullCheck(object: AbstractControl): any {
    return object != null ? null : {checkNull: true};
  };

// cityThis: City;
  updatedMember: Member;

  submit() {
    if (this.selectedImage.name == null) {
      this.updatedMember = this.infoForm.value;

      console.log('city form is : ' + this.infoForm.controls.city.value.name);
      this.updatedMember.city = this.infoForm.controls.city.value;
      console.log('mem city is: ' + this.updatedMember.city.name);
      this.memberService.updateMember(this.updatedMember).subscribe(value => {
        this.memberGender = this.updatedMember.gender;
        this.currentMemberPoint = this.updatedMember.point;

        this.alertWithSuccess('Thông tin của quý khách đã cập nhật thành công');
      }, error => {
        this.erroalert('Cập nhật thất bại, quý khách vui lòng kiểm lại các thông tin đã nhập');
      });

      // const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
      // const fileRef = this.storage.ref(nameImg);
      // this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
      //   finalize(() => {
      //     //  down link từ firabase và path vào image
      //     fileRef.getDownloadURL().subscribe((url) => {
      //       //set link vao thuoc tinh anh
      //       this.infoForm.patchValue({image: url});
      if (this.infoForm.valid) {
        this.member = Object.assign({}, this.infoForm.value);
      }
      // tiến hành thêm mới
      this.memberService.updateMember(this.member).subscribe(() => {

      });

      //     });
      //   })
      // ).subscribe();
    } else {

      this.updatedMember = this.infoForm.value;

      console.log(this.updatedMember.city = this.updateCity);
      this.memberService.updateMember(this.updatedMember).subscribe(value => {
        this.memberGender = this.updatedMember.gender;
        this.currentMemberPoint = this.updatedMember.point;

        this.alertWithSuccess('Thông tin của quý khách đã cập nhật thành công');
      }, error => {
        this.erroalert('Cập nhật thất bại, quý khách vui lòng kiểm lại các thông tin đã nhập');
      });

      const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
      const fileRef = this.storage.ref(nameImg);
      this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          //  down link từ firabase và path vào image
          fileRef.getDownloadURL().subscribe((url) => {
            //set link vao thuoc tinh anh
            this.infoForm.patchValue({image: url});
            if (this.infoForm.valid) {
              this.member = Object.assign({}, this.infoForm.value);
            }
            // tiến hành thêm mới
            this.memberService.updateMember(this.member).subscribe(() => {

            });

          });
        })
      ).subscribe();
    }


  }


  get dateOfBirth() {
    return this.infoForm.get('dateOfBirth');
  }

  get wardId() {
    return this.infoForm.get('wardId');
  }

  get email() {
    return this.infoForm.get('email');
  }

  get gender() {
    return this.infoForm.get('gender');
  }

  get identityNumber() {
    return this.infoForm.get('identityNumber');
  }

  get image() {
    return this.infoForm.get('image');
  }

  get name() {
    return this.infoForm.get('name');
  }

  get phone() {
    return this.infoForm.get('phone');
  }


  get account() {
    return this.infoForm.get('account');
  }

  get point() {
    return this.infoForm.get('point');
  }

  get id() {
    return this.infoForm.get('id');
  }

  get address() {
    return this.infoForm.get('address');
  }

//-----------------------------------------------------

  gainedHistoryForm: FormGroup = new FormGroup({
    startDate: new FormControl('2000-01-01', [Validators.required]),
    endDate: new FormControl('2025-12-12', [Validators.required]),
    typeHistory: new FormControl('0', [Validators.required]),
  });



  searchGainedHistory() {
    this.searchType = Number(this.gainedHistoryForm.controls.typeHistory.value);

    const paraStartDate = this.gainedHistoryForm.controls.startDate.value;
    const paraEndDate = this.gainedHistoryForm.controls.endDate.value;

    this.memberService.viewPointHistory(this.memberId, this.searchType, paraStartDate, paraEndDate, this.gainedPage).subscribe(value => {
      this.gainedPointPage = value['content'];

      // console.log(this.gainedPointPage)
      this.totalPages = value['totalPages'];
    }, error => {
    });
  };

  nextPage() {
    // this.gainedPage++;
    if (this.gainedPage <= this.totalPages) {
      this.gainedPage = this.gainedPage + 1;
    }
    this.searchType = Number(this.gainedHistoryForm.controls.typeHistory.value);

    const paraStartDate = this.gainedHistoryForm.controls.startDate.value;
    const paraEndDate = this.gainedHistoryForm.controls.endDate.value;
    this.memberService.viewPointHistory(this.member.id, this.searchType, paraStartDate, paraEndDate, this.gainedPage).subscribe(value => {

      this.gainedPointPage = value['content'];

    });
  };

  backPage() {
    this.gainedPage = this.gainedPage - 1;
    if (this.gainedPage == 0 || this.gainedPage < 0) {
      this.gainedPage = 0;
      this.ngOnInit();
    } else {
      this.searchType = Number(this.gainedHistoryForm.controls.typeHistory.value);
      const paraStartDate = this.gainedHistoryForm.controls.startDate.value;
      const paraEndDate = this.gainedHistoryForm.controls.endDate.value;
      this.memberService.viewPointHistory(this.member.id, this.searchType, paraStartDate, paraEndDate, this.gainedPage).subscribe(value => {

        this.gainedPointPage = value['content'];

      });
    }
  }

  setDefault(e) {
    this.searchType = Number(e.target.value);
    this.gainedPage = 0;
    this.searchGainedHistory();
  }

//------change passworld LongTK-------------------------

  errorMsg: string;
  changePasswordForm: FormGroup = new FormGroup({
    oldPass: new FormControl('', [Validators.required]),
    pwGroup: new FormGroup({
      newPassword: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    }, this.comparePassword)

  });

  get oldPass() {
    return this.changePasswordForm.get('oldPass');
  }

  get newPassword() {
    return this.changePasswordForm.get('pwGroup').get('newPassword');
  }

  get confirmPassword() {
    return this.changePasswordForm.get('pwGroup').get('confirmPassword');
  }

  testOldPassword(oldPass: AbstractControl) {
    const v = oldPass.value;

    return (v.newPassword === v.confirmPassword) ?
      null : {
        passWordNotMatch: true
      };
  }

  comparePassword(c: AbstractControl) {
    const v = c.value;
    return (v.newPassword === v.confirmPassword) ?
      null : {
        passwordnotmatch: true
      };
  }

// Long TK
  showPreview(event: any) {

    this.selectedImage = event.target.files[0];

    if (event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event: any) => {
        this.imageThis = event.target.result;
      };
    }
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }

  confirmChange() {
    const oldPass = this.oldPass.value;
    const updateNewPass = this.newPassword.value;

    this.memberService.changePassword(this.member.id, oldPass, updateNewPass, this.member).subscribe(value => {
      this.alertWithSuccess('Mật khẩu đã cập nhật thành công');
    }, error => {
      this.errorMsg = error.error;
      this.erroalert(this.errorMsg);
    });
  }
}
