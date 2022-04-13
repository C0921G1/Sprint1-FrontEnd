import {Component, OnInit} from '@angular/core';
import {SharingDataService} from '../sharing-data.service';
import {SelectedSeatService} from '../../service/buy-ticket/selected-seat.service';
import {SelectedSeat} from '../../model/selected-seat';
import {ActivatedRoute, Router} from '@angular/router';
import {ShowtimeService} from '../../service/buy-ticket/showtime.service';
import {TokenStorageService} from '../../service/security/token-storage.service';
import Swal from 'sweetalert2';
import {SeatTypeService} from '../../service/buy-ticket/seat-type.service';
import {SeatType} from '../../model/seat-type';
import {ShowTime} from "../../model/ShowTime";

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.css']
})

export class SeatSelectionComponent implements OnInit {

  currentShowTimeChooseObj: ShowTime;
  selectedSeatList: SelectedSeat[] = [];
  seatList = [];
  seatMapRow = 10;
  seatMapColumn = 5;
  totalSeat = this.seatMapRow * this.seatMapColumn;
  seat: { id: number; status: boolean };
  seatMap = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10',
    'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10',
    'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10',
    'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10',
    'E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9', 'E10'];
  totalPayment = 0;
  seatChoosenList = [];
  comboNumber = 0;
  orderDetailSeatNumber = 0;
  count = 0;
  memberId: string;
  economySeat: SeatType;
  commonSeat: SeatType;
  VIPSeat: SeatType;
  countEconomySeat = [];
  countCommonSeat = [];
  countVIPSeat = [];
  errorPromoCode: boolean;
  usedPromoCode: boolean;
  successPromoCode: boolean;
  combo = {id: 1, name: 'Combo Bắp + Nước', price: 85000};


  constructor(private sharingDataService: SharingDataService,
              private selectedSeatService: SelectedSeatService,
              private showtimeService: ShowtimeService,
              private activatedRoute: ActivatedRoute,
              private seatTypeService: SeatTypeService,
              private tokenStorageService: TokenStorageService,
              private router: Router) {
  }

  public showContent = false;

  ngOnInit(): void {
    /*DatTC - Lấy dữ liệu loại ghế theo id*/
    this.seatTypeService.findById(3).subscribe(value => {
      this.economySeat = value;
    });
    this.seatTypeService.findById(2).subscribe(value => {
      this.commonSeat = value;

    });
    this.seatTypeService.findById(1).subscribe(value => {
      this.VIPSeat = value;

    });

    /* DatTC - Lấy thông tin user đăng nhập*/
    this.memberId = this.tokenStorageService.getUser().member;
    console.log(this.memberId);

    /*DatTC - Lấy thông tin xuất chiếu dựa theo film id*/
    const id = this.activatedRoute.snapshot.params.id;
    //DatTC - TH có dữ liệu
    this.showtimeService.findById(id).subscribe(value => this.currentShowTimeChooseObj = value);
    this.selectedSeatService.getAllSelectedSeatByShowTimeId(id).subscribe(value1 => {
      this.selectedSeatList = value1;
      this.createSeat(this.totalSeat);
      this.updateSeat();
      console.log(this.selectedSeatList);
      console.log(this.seatList);
    }, error => {
      //DatTC - TH không có dữ liệu
      this.createSeat(this.totalSeat);
    });

    /*DatTC - Delay thời gian hiển thị*/
    setTimeout(() => {
      this.showContent = true;
    }, 0);
  }

  /*DatTC - Tạo bản đồ ghế*/
  createSeat(quantity: number) {
    console.log(this.selectedSeatList);
    for (let i = 0; i < quantity; i++) {
      this.seat = {
        id: i + 1,
        status: false
      };
      this.seatList.push(this.seat);
    }
  }

  /*DatTC - Update lại dữ liệu nếu có ghế đã đặt*/
  updateSeat() {
    console.log(this.selectedSeatList);
    for (let i = 0; i < this.seatList.length; i++) {
      for (let j = 0; j < this.selectedSeatList.length; j++) {
        if (this.seatList[i].id === this.selectedSeatList[j].seatPosition) {
          this.seatList[i].status = true;
        }
      }
    }
  }

  /*DatTC - Lấy thông tin user chọn ghế*/
  getSeat(seatObj: any) {
    const nonActive = this.count < this.orderDetailSeatNumber && !seatObj.active;
    const active = this.count <= this.orderDetailSeatNumber && seatObj.active;
    if (this.orderDetailSeatNumber === 0) {
      Swal.fire({
        position: 'top',
        background: '#f8f9fa',
        width: 500,
        heightAuto: true,
        icon: 'error',
        title: 'Vui lòng chọn số lượng vé trước khi chọn ghế',

        toast: true,
        showConfirmButton: false,
        timer: 3000,
      });
    }

    /*DatTC - Đổi màu ghế khi user chọn ghế*/
    if (!seatObj.status) {
      if (nonActive || active) {
        if (nonActive) {
          this.count++;
        } else {
          this.count--;
        }
        seatObj.active = !seatObj.active;
        this.successPromoCode = false;
        if (seatObj.active) {
          this.seatChoosenList.push(seatObj.id);
          if (seatObj.id <= 20) {
            this.totalPayment += this.economySeat.price;
            this.countEconomySeat.push(this.economySeat);
            console.log(this.countEconomySeat);
          }
          if (seatObj.id > 20 && seatObj.id <= 40) {
            this.totalPayment += this.commonSeat.price;
            this.countCommonSeat.push(this.commonSeat);
          }
          if (seatObj.id > 40 && seatObj.id <= 50) {
            this.totalPayment += this.VIPSeat.price;
            this.countVIPSeat.push(this.VIPSeat);
          }
        } else if (!seatObj.active) {
          this.seatChoosenList.splice(this.seatChoosenList.indexOf(seatObj.id), 1);
          if (seatObj.id <= 20) {
            this.totalPayment -= this.economySeat.price;
            this.countEconomySeat.splice(0, 1);
            console.log(this.countEconomySeat);
          }
          if (seatObj.id > 20 && seatObj.id <= 40) {
            this.totalPayment -= this.commonSeat.price;
            this.countCommonSeat.splice(0, 1);
          }
          if (seatObj.id > 40 && seatObj.id <= 50) {
            this.totalPayment -= this.VIPSeat.price;
            this.countVIPSeat.splice(0, 1);
          }
        }
        if (this.totalPayment < 0){
          this.totalPayment = 0;
        }
        console.log(this.seatChoosenList);
      }
    } else {
      Swal.fire({
        position: 'top',
        background: '#f8f9fa',
        width: 500,
        heightAuto: true,
        icon: 'error',
        title: 'Không thể chọn ghế đã được đặt trước!',

        toast: true,
        showConfirmButton: false,
        timer: 3000,
      });
    }
  }

  /*DatTC - Func tăng giảm số lượng vé*/
  plusTicket() {
    this.orderDetailSeatNumber += 1;
  }

  minusTicket() {
    if (this.orderDetailSeatNumber > 0 && this.count < this.orderDetailSeatNumber) {
      this.orderDetailSeatNumber -= 1;
    } else {
      Swal.fire({
        position: 'top',
        background: '#f8f9fa',
        width: 500,
        heightAuto: true,
        icon: 'error',
        title: 'Số lượng vé không thể nhỏ hơn số ghế đã chọn!',

        toast: true,
        showConfirmButton: false,
        timer: 3000,
      });
    }
  }

  /*DatTC - Func tăng giảm số lượng combo*/
  minusCombo() {
    if (this.comboNumber > 0 && this.totalPayment >= this.combo.price) {
      this.comboNumber -= 1;
      this.totalPayment -= this.combo.price;
    }
  }

  plusCombo() {
    this.comboNumber += 1;
    this.totalPayment += this.combo.price;
  }

  /*DatTC - Func chuyển đối tượng sang màn hình thanh toán của TaiDHN*/
  transferPayment() {
    if (this.seatChoosenList.length == this.orderDetailSeatNumber && this.orderDetailSeatNumber > 0) {
      const transferObj = {
        showtime: this.currentShowTimeChooseObj,
        seatChoose: this.seatChoosenList,
        totalPayment: this.totalPayment,
        combo: this.combo,
        member: this.tokenStorageService.getUser().member
      };
      this.sharingDataService.getDataFromFirstComponent(transferObj);
      console.log(transferObj);
      this.router.navigateByUrl('/booking/info-booking');
    } else if (this.seatChoosenList.length < this.orderDetailSeatNumber) {
      Swal.fire({
        position: 'top',
        background: '#f8f9fa',
        width: 500,
        heightAuto: true,
        icon: 'error',
        title: 'Vui lòng chọn đủ số lượng ghế!',

        toast: true,
        showConfirmButton: false,
        timer: 3000,
      });
    } else {
      Swal.fire({
        position: 'top',
        background: '#f8f9fa',
        width: 500,
        heightAuto: true,
        icon: 'error',
        title: 'Vui lòng chọn ghế trước khi thanh toán!',

        toast: true,
        showConfirmButton: false,
        timer: 3000,
      });
    }
    this.usedPromoCode = true;
  }

  /*DatTC - Func để kiểm tra mã khuyến mãi & áp dụng mã*/
  promotion(code: any) {
    if (code === 'C0921G1') {
      if (this.totalPayment >= 50000 && !this.usedPromoCode) {
        this.totalPayment -= 50000;
        this.errorPromoCode = false;
        this.successPromoCode = true;
      }
    } else {
      this.errorPromoCode = true;
    }
  }
}



