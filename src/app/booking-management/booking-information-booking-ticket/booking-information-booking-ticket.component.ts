import {Component, OnChanges, OnInit} from '@angular/core';
import {ICreateOrderRequest, IPayPalConfig} from 'ngx-paypal';
import {PaymentService} from '../../service/payment/payment.service';
import {Transaction} from '../../model/Transaction';
import {SharingDataService} from '../../buy-ticket/sharing-data.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {SelectedSeatService} from '../../service/buy-ticket/selected-seat.service';
import {SelectedSeat} from '../../model/selected-seat';
import {CurrentSelectedSeat} from '../../model/current-selected-seat';
import {SeatTypeService} from '../../service/buy-ticket/seat-type.service';
import {ShowtimeService} from '../../service/buy-ticket/showtime.service';
import {Observable} from 'rxjs';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {SpinnerNhanComponent} from '../../member-management/member-account-registration/spinner-nhan/spinner-nhan.component';


@Component({
  selector: 'app-booking-information-booking-ticket',
  templateUrl: './booking-information-booking-ticket.component.html',
  styleUrls: ['./booking-information-booking-ticket.component.css']
})
export class BookingInformationBookingTicketComponent implements OnInit {
  seatMap = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10',
    'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10',
    'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10',
    'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10',
    'E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9', 'E10'];

  seatChooseList = [];

  constructor(private paymentService: PaymentService,
              private  sharingDataService: SharingDataService,
              private selectedSeatService: SelectedSeatService,
              private seatTypeService: SeatTypeService,
              private showtimeService: ShowtimeService,
              private dialog: MatDialog,
              private router: Router) {
  }

  currentDate = new Date().toISOString().slice(0, 10);
  numBK= 1;
  receiveObj: any;

  transaction: Transaction
    = {
    code: 'BK-'+this.numBK++,
    transactionalDate: this.currentDate,
    ticketStatus: '1',
    checkAcceptTicket: 0,
    pointGained: 0.0,
    pointUsed: 0.0,
  };



  public payPalConfig ?: IPayPalConfig;
  check = false;
  sum: any;
  flag3434: boolean = false;
  currentTransaction: CurrentSelectedSeat = {};
  observableSpin= new Observable(this.myObservable);

  ngOnInit(): void {
    console.log(this.transaction);
    this.sharingDataService.obj.subscribe(value => {
      this.receiveObj = value;
      console.log(this.receiveObj.showtime.date);


      this.seatChooseList = this.receiveObj.seatChoose;
      console.log(this.receiveObj);
      if (this.receiveObj == null) {
        this.router.navigateByUrl('/buy-ticket');
      } else {
        //Tổng tiền thành toán paypal
        this.sum = this.receiveObj.totalPayment / 26000;
        this.sum = this.sum.toFixed(2);
        this.sum = this.sum + '';
        console.log(this.sum);
        this.initConfig();
      }
    });


  }
  myObservable(observer) {
    setTimeout(() => {
      observer.next("done waiting for 2 sec");
      observer.complete();
    }, 5000);
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

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId: 'sb',
      createOrderOnClient: (data) => <ICreateOrderRequest> {

        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: this.sum,
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  value: this.sum,
                }
              }
            },
            items: [
              {
                name: 'Enterprise Subscription',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'USD',
                  value: this.sum,
                },
              }
            ]
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'pay',
        layout: 'horizontal',
        size: 'small',
        tagline: false

      },
      onApprove: (data, actions) => {
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {

        //lấy thông tin showtime còn thông tin member nữa là xong
        this.transaction.showTime = this.receiveObj['showtime'];
        this.transaction.member = this.receiveObj['member'];
        this.transaction.seatNote = this.receiveObj.seatChoose.toString();
        console.log(this.receiveObj.seatChoose);

        this.showProgressSpinnerUntilExecuted(this.observableSpin);
        this.paymentService.payment(this.transaction).subscribe(value => {
          this.transaction = value;
          Swal.fire({
            position: 'top',
            background: '#f8f9fa',
            width: 400,
            heightAuto: true,
            icon: 'success',
            title: 'Bạn đã thanh toán thành công',
            toast: true,
            showConfirmButton: false,
            timer: 3000,
          });
          this.flag3434 = true;
          this.router.navigateByUrl('/booking-ticket');

          /*Lưu ghế đã chọn*/
          setTimeout(() => {

            for (let i = 0; i < this.receiveObj.seatChoose.length; i++) {
              console.log('OKKKKKK!!!!');
              this.currentTransaction.bookingDate = this.receiveObj.showtime.date;
              this.currentTransaction.seatPosition = this.receiveObj.seatChoose[i];
              this.currentTransaction.status = 0;
              if (this.receiveObj.seatChoose[i] <= 20) {
                this.currentTransaction.seatTypeId = 3;
              } else if (this.receiveObj.seatChoose[i] > 20 && this.receiveObj.seatChoose[i] <= 40) {
                this.currentTransaction.seatTypeId = 2;
              } else if (this.receiveObj.seatChoose[i] > 40 && this.receiveObj.seatChoose[i] <= 50) {
                this.currentTransaction.seatTypeId = 1;
              }
              this.currentTransaction.showTimeId = this.receiveObj.showtime.id;
              console.log(this.currentTransaction);
              this.paymentService.saveSelectedSeat(this.currentTransaction).subscribe();
            }
          }, 1000);

           // END_____Lưu ghế

        });

      },
      onCancel: (data, actions) => {
        Swal.fire({
          position: 'center',
          background: '#f8f9fa',
          width: 400,
          heightAuto: true,
          icon: 'error',
          title: 'Bạn đã hủy thanh toán',
          toast: true,
          showConfirmButton: false,
          timer: 3000,
        });


      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }

  show() {

    this.check = !this.check;
  }

  checkbox() {

    Swal.fire({
      position: 'center',
      background: '#f8f9fa',
      width: 400,
      heightAuto: true,
      icon: 'error',
      title: 'Bạn đã hủy thanh toán',
      toast: true,
      showConfirmButton: false,
      timer: 3000,
    });
  }
}
