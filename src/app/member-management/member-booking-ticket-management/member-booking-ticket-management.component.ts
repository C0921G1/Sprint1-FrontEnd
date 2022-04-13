import { Component, OnInit } from '@angular/core';
import {TradingHistory} from '../../model/trading-history';
import {MemberService} from '../../service/member.service';
import {TokenStorageService} from '../../service/security/token-storage.service';
import {Observable} from 'rxjs';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {SpinnerNhanComponent} from '../member-account-registration/spinner-nhan/spinner-nhan.component';

@Component({
  selector: 'app-member-booking-ticket-management',
  templateUrl: './member-booking-ticket-management.component.html',
  styleUrls: ['./member-booking-ticket-management.component.css']
})
export class MemberBookingTicketManagementComponent implements OnInit {


  tradingHistoryList: TradingHistory[];
  tradingHistory: TradingHistory;
  observableSpin= new Observable(this.myObservable);
  p: number = 0;

  totalPagination: number;
  totalElement: number
  searchText: string = "";
  memberId: string ;
// memberId: string = "TV-0004";

  constructor(

    public tradingHistoryService: MemberService,
    private tokenStorageService: TokenStorageService,
    private dialog: MatDialog,) {

  }

  ngOnInit(): void {

    this.memberId = this.tokenStorageService.getUser().member.id;
    this.showProgressSpinnerUntilExecuted(this.observableSpin);
    console.log(this.memberId);
    // console.log("===============================")
    setTimeout(()=>{
      this.getTradingHistory(this.p,this.memberId,this.searchText);
    }, 1500)


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

//NhanNT get trading history list
  getTradingHistory(page:number,id:string,name:string){
    this.tradingHistoryService.getTradingHistory(page,id,name).subscribe(value => {
      if(value === null){
        this.tradingHistoryList = [];
        this.totalPagination = 0;
        this.totalElement = 0;
      }
      else{
        this.tradingHistoryList = value['content'];
        // console.log(this.tradingHistoryList)
        this.totalPagination = value['totalPages'];
        this.totalElement = value['totalElements'];
      }
      // this.p = 0;
    })
  }
  nextPage() {
    if (this.p <= this.totalPagination) {
      this.p = this.p + 1;
    }
    this.getTradingHistory(this.p,this.memberId,this.searchText)
  }

  previousPage() {
    this.p = this.p - 1;
    if (this.p == 0 || this.p < 0) {
      this.p = 0;
      this.ngOnInit();
    } else {
      this.getTradingHistory(this.p,this.memberId,this.searchText)
    }
  }
  search(){
    this.p = 0;
    this.ngOnInit();
  }
}
