import {Component, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import Swal from 'sweetalert2';

declare var require: any;
const More = require('highcharts/highcharts-more');
More(Highcharts);

import Histogram from 'highcharts/modules/histogram-bellcurve';

Histogram(Highcharts);

import highcharts3D from 'highcharts/highcharts-3d';

highcharts3D(Highcharts);

import Cylinder from 'highcharts/modules/cylinder';

Cylinder(Highcharts);

const Exporting = require('highcharts/modules/exporting');
Exporting(Highcharts);

const ExportData = require('highcharts/modules/export-data');
ExportData(Highcharts);

const Accessibility = require('highcharts/modules/accessibility');
Accessibility(Highcharts);
import {Router} from "@angular/router";
import {StatisticalCommonService} from "../../service/statistical-common.service";
import {TokenStorageService} from "../../service/security/token-storage.service";

@Component({
  selector: 'app-statistical-member',
  templateUrl: './statistical-member.component.html',
  styleUrls: ['./statistical-member.component.css']
})
export class StatisticalMemberComponent implements OnInit {
  imgAdmin: string;
  nameAdmin: string;
  emailAdmin: string;
  private name: string[] = [];
  private totalTicket: number[] = [];
  private totalMoney: number[] = [];
  private point: number[] = [];
  private options: any;
  quarter: string = "";
  year: string = "";
  yearList: any = [];
  quarterList: any = [1, 2, 3, 4];

  constructor(private statisticalCommonService: StatisticalCommonService,
              private tokenStorageService: TokenStorageService,
              private router: Router) {
  }

  ngOnInit() {
    this.statisticalCommonService.getInforAdmin(this.tokenStorageService.getUser().member.id).subscribe(value => {
      for (let i = 0; i<value.length; i ++){
        this.imgAdmin = value[i].image;
        this.nameAdmin = value[i].name;
        this.emailAdmin = value[i].email;
      }
    });
    this.statisticalCommonService.getYear().subscribe(value1 => {
      this.yearList = value1;
      this.name = [];
      this.totalTicket = [];
      this.totalMoney = [];
      this.point = [];
      this.statisticalCommonService.getAllTopMember(this.quarter, this.year).subscribe(value => {
        for (let i = 0; i < value.length; i++) {
          this.name[i] = value[i].id + ' - ' + value[i].name
          this.totalTicket[i] = Number(value[i].totalTicket)
          this.totalMoney[i] = Number(value[i].totalMoney)
          this.point[i] = Number(value[i].point)
        }
        this.options = {
          chart: {
            height: 510,
            type: 'cylinder',
            options3d: {
              enabled: true,
              alpha: 0,
              beta: 0,
              depth: 50,
              viewDistance: 30
            }
          },
          title: {
            text: ''
          },
          plotOptions: {
            series: {
              depth: 25,
            }
          },
          xAxis: {
            categories: this.name,
            crosshair: true
          },
          yAxis: {
            min: 0,
            title: {
              text: ''
            }
          },
          tooltip: {
            headerFormat: '<span style="font-size:15px;padding-left: 40px;">{point.key}</span><table>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
          },
          series: [
            {
              name: 'S??? l?????ng v??',
              color: 'rgb(128, 133, 233)',
              tooltip: {
                pointFormat: '<tr><td style="color:{series.color};padding:8px;">{series.name}: </td>' +
                  '<td style="padding:3px"><b>{point.y: f} v??</b></td></tr>',
              },
              data: this.totalTicket,
            },
            {
              name: 'T???ng ti???n',
              color: 'rgb(43, 144, 143)',
              tooltip: {
                pointFormat: '<tr><td style="color:{series.color};padding:8px">{series.name}: </td>' +
                  '<td style="padding:3px"><b>{point.y: f} ?????ng</b></td></tr>',
              },
              data: this.totalMoney,
            },
            {
              name: '??i???m t??ch l??y',
              color: 'rgb(145, 232, 225)',
              tooltip: {
                pointFormat: '<tr><td style="color:{series.color};padding:8px">{series.name}: </td>' +
                  '<td style="padding:3px"><b>{point.y: f} ??i???m</b></td></tr>',
              },
              data: this.point
            },
          ],
        };
        Highcharts.chart('member', this.options);
      }, error => {
        Swal.fire({
          icon: 'error',
          title: 'L???i',
          text: 'Kh??ng c?? d??? li???u cho l???a ch???n c???a b???n',
        })
      })
    })
  }

  getAllTopMemberByYear() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    })
    Toast.fire({
      icon: 'success',
      title: 'B???n ??ang xem Top th???ng k??' +
        ' th??nh vi??n n??m ' + this.year
    })
    this.ngOnInit()
  }

  getAllTopMemberByQuarterAndYear() {
    if (this.year == undefined || this.year == "") {
      Swal.fire(
        'L???i',
        'Vui l??ng ch???n n??m mu???n xem',
        'question'
      )
    } else {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      })

      Toast.fire({
        icon: 'success',
        title: 'B???n ??ang xem Top th???ng k??' +
          ' th??nh vi??n qu?? ' + this.quarter + ' n??m ' + this.year
      })
      this.ngOnInit()
    }
  }

  clear() {
    this.quarter = undefined;
    this.year = undefined;
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    })
    Toast.fire({
      icon: 'success',
      title: 'B???n ??ang xem Top th???ng k??' +
        ' th??nh vi??n ?????y ?????'
    })
    this.ngOnInit()
  }
}
