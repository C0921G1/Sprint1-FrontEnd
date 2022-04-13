import {Component, OnInit} from '@angular/core';
import {BookingManageService} from '../../service/booking-manage/booking-manage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Transaction} from '../../model/Transaction';
import Swal from 'sweetalert2';
import {SharingDataService} from '../../buy-ticket/sharing-data.service';

@Component({
  selector: 'app-booking-confirm-booking-ticket',
  templateUrl: './booking-confirm-booking-ticket.component.html',
  styleUrls: ['./booking-confirm-booking-ticket.component.css']
})
export class BookingConfirmBookingTicketComponent implements OnInit {
  transaction: Transaction;
  id: number;
  transfer: any;
  seatChoosenList = [];
  totalPayment: number;

  constructor(private bookingManageService: BookingManageService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private sharingDataService: SharingDataService) {
  }

  ngOnInit(): void {
    this.sharingDataService.sharedDataWithSecondComponent().subscribe(value => {
      this.transfer = value;
      console.log(this.transfer);
    });
    this.id = this.activatedRoute.snapshot.params.id;
    this.bookingManageService.findById(this.id).subscribe(value => {
      this.transaction = value;
    });
  }

//AnhVN xác nhận nhận vé
  acceptTicket() {
    this.bookingManageService.acceptTicket(this.transaction).subscribe(() => {
      Swal.fire(
        'Xác nhận vé thành công !',
        'Trở lại trang danh sách.',
        'success'
      );
      this.router.navigateByUrl('/booking/list');
    });
  }
}
