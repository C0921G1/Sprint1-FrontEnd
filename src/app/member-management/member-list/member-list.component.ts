import { Component, OnInit } from '@angular/core';
import {MemberManagementService} from "../../service/member-management/member-management.service";
import {Member} from "../../model/member";

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  members: Member[];

  //pagination variables - KhanhLDQ
  totalPage: number;
  currentPage: number = 0;
  totalMember: number;
  currentMember: number;

  constructor(
    private memberManagementService: MemberManagementService
  ) { }

  ngOnInit(): void {
    this.getAllMembers();
  }

  //KhanhLDQ
  getAllMembers() {
    this.memberManagementService.getAllMembers(this.currentPage).subscribe(value => {
      //set values for those variables
      this.members = value['content'];
      console.log(value);
      console.log("---------");
      console.log(this.members);
      this.totalPage = value['totalPages']
      this.currentPage = value['number'];
      this.totalMember = value['totalElements'];
      this.currentMember = value['numberOfElements'];

      // console.log('no search');
      //
      // console.log(this.totalPage);
      // console.log(this.currentPage);
      // console.log(this.totalMember);
      // console.log(this.currentMember);

    }, error => {
      console.log(error);
    })
  }

  //move to previous page - KhanhLDQ
  moveToPreviousPage() {
    this.currentPage -= 1;
    this.ngOnInit();
  }

  //move to next page - KhanhLDQ
  moveToNextPage() {
    this.currentPage += 1;
    this.ngOnInit();
  }

  //search params - KhanhLDQ
  pointArr: string[];
  firstValue: number;
  secondValue: number;

  totalPageSearch: number;
  currentPageSearch: number = 0;
  totalMemberSearch: number;
  currentMemberSearch: number;

  buttonSearchFlag: boolean = false;

  memberName: string = "";
  pointRange: string = "0";

  //search members by name and point range - KhanhLDQ
  searchMembers() {
    // console.log(this.memberName);
    // console.log(this.pointRange);

    this.buttonSearchFlag = true;

    if (this.currentPageSearch != 0)
      this.currentPageSearch = 0;

    if (this.pointRange != "0") {
      this.pointArr = this.pointRange.split("-");
      // console.log(this.pointArr);

      this.firstValue = Number(this.pointArr[0]);
      this.secondValue = Number(this.pointArr[1]);

      // console.log(this.firstValue);
      // console.log(this.secondValue);

      this.callSearchApi();
    } else {
      this.callSearchPointDefaultApi();
    }

    console.log('search');
    // console.log(this.currentPageSearch);
  }

  //KhanhLDQ
  moveToPreviousPageSearch() {
    this.currentPageSearch -= 1;
    this.buttonSearchFlag = true;

    // console.log(this.memberName);
    // console.log(this.pointRange);
    // console.log(this.firstValue);
    // console.log(this.secondValue);


    if (this.pointRange != "0") {
      this.callSearchApi();
    } else {
      this.callSearchPointDefaultApi();
    }

  }

  //KHanhLDQ
  moveToNextPageSearch() {
    this.currentPageSearch += 1;
    this.buttonSearchFlag = true;

    // console.log(this.memberName);
    // console.log(this.pointRange);
    // console.log(this.firstValue);
    // console.log(this.secondValue);

    if (this.pointRange != "0") {
      this.callSearchApi();
    } else {
      this.callSearchPointDefaultApi();
    }

  }

  //KhanhLDQ
  callSearchApi() {
    this.memberManagementService.
    searchMembersByNameAndPointRange(this.currentPageSearch,this.memberName,this.firstValue,this.secondValue).subscribe(value => {

      console.log('point # 0');
      console.log(value);

      this.checkReturnValue(value);

      // if (value == null) {
      //   this.members = [];
      //   this.totalPageSearch = 0;
      //   this.totalMemberSearch = 0;
      //   this.currentMemberSearch = 0;
      //
      // } else {
      //   this.members = value['content'];
      //   this.totalPageSearch = value['totalPages'];
      //   this.currentPageSearch = value['number'];
      //   this.totalMemberSearch = value['totalElements'];
      //   this.currentMemberSearch = value['numberOfElements'];
      // }
      //
      // console.log(this.totalPageSearch);
      // console.log(this.currentPageSearch);
      // console.log(this.totalMemberSearch);
      // console.log(this.currentMemberSearch);

    }, error => {
      console.log(error);
    })
  }

  //KhanhLDQ
  callSearchPointDefaultApi() {
    this.memberManagementService.
    searchMembersByNameAndPointDefault(this.currentPageSearch,this.memberName).subscribe(value => {

      console.log('point = 0');
      console.log(value);

      this.checkReturnValue(value);

      // if (value == null) {
      //   this.members = [];
      //   this.totalPageSearch = 0;
      //   this.totalMemberSearch = 0;
      //   this.currentMemberSearch = 0;
      //
      // } else {
      //   this.members = value['content'];
      //   this.totalPageSearch = value['totalPages'];
      //   this.currentPageSearch = value['number'];
      //   this.totalMemberSearch = value['totalElements'];
      //   this.currentMemberSearch = value['numberOfElements'];
      // }
      //
      // console.log(this.totalPageSearch);
      // console.log(this.currentPageSearch);
      // console.log(this.totalMemberSearch);
      // console.log(this.currentMemberSearch);

    }, error => {
      console.log(error);
    })
  }

  //KhanhLDQ
  checkReturnValue(value: any) {
    if (value == null) {
      this.members = [];
      this.totalPageSearch = 0;
      this.totalMemberSearch = 0;
      this.currentMemberSearch = 0;

    } else {
      this.members = value['content'];
      this.totalPageSearch = value['totalPages'];
      this.currentPageSearch = value['number'];
      this.totalMemberSearch = value['totalElements'];
      this.currentMemberSearch = value['numberOfElements'];
    }

    console.log(this.totalPageSearch);
    console.log(this.currentPageSearch);
    console.log(this.totalMemberSearch);
    console.log(this.currentMemberSearch);
  }

  resetSearch() {
    this.memberName = "";
    this.pointRange = "0";
  }

  member: Member;

  showInfoMember(id: string) {
    this.memberManagementService.getMemberById(id).subscribe(value => {
      this.member = value;
      // console.log(this.member);
    }, error => {
      console.log(error);
    })
  }

}
