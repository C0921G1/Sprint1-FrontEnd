import {Component, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import {StatisticalCommonService} from "../../service/statistical-common.service";
import Swal from "sweetalert2";
import {TokenStorageService} from "../../service/security/token-storage.service";
@Component({
  selector: 'app-statistical-common-management',
  templateUrl: './statistical-common-management.component.html',
  styleUrls: ['./statistical-common-management.component.css']
})
export class StatisticalCommonManagementComponent implements OnInit {
  imgAdmin: string;
  nameAdmin: string;
  emailAdmin: string;
  public nameFilm: string[] = [];
  private totalTicketFilm: number[] = [];
  private totalMoneyFilm: number[] = [];
  private options: any;
  private nameMember: string[] = [];
  private totalTicketMember: number[] = [];
  private totalMoneyMember: number[] = [];
  private pointMember: number[] = [];
  private date: string[] = [];
  private totelMoneyRevenue: number[] = [];
  quarter: string = "";
  year: string = "";
  constructor(private statisticalCommonService: StatisticalCommonService,
              private tokenStorageService: TokenStorageService) {
  }
  ngOnInit(): void {
    this.statisticalCommonService.getInforAdmin(this.tokenStorageService.getUser().member.id).subscribe(value => {
      for (let i = 0; i<value.length; i ++){
        this.imgAdmin = value[i].image;
        this.nameAdmin = value[i].name;
        this.emailAdmin = value[i].email;
      }
    });
    this.statisticalCommonService.getAllTopFilm().subscribe(value => {
      for (let i = 0; i < value.length; i++) {
        this.nameFilm[i] = value[i].name
        this.totalTicketFilm[i] = Number(value[i].totalTicket)
        this.totalMoneyFilm[i] = Number(value[i].totalMoney)
      }
      this.options = {
        chart: {
          height:450,
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
          text: 'Danh s??ch TOP phim c?? doanh thu cao nh???t',
        },
        yAxis: {
          min: 0,
          title: {
            text: ''
          }
        },
        xAxis: {
          lineColor: '#fff',
          categories: this.nameFilm,
          crosshair: true,
        },
        plotOptions: {
          series: {
            depth: 25,
          }
        },
        tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
        },
        series: [
          {
            name: 'V?? b??n ???????c',
            color: '#506EF9',
            tooltip: {
              pointFormat: '<tr><td style="color:{series.color};padding:10px">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:f} v??</b></td></tr>',
            },
            data: this.totalTicketFilm,
          },
          {
            name: 'T???ng ti???n',
            color: 'rgb(43, 144, 143)',
            tooltip: {
              pointFormat: '<tr><td style="color:{series.color};padding:10px">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y: f} ?????ng</b></td></tr>',
            },
            data: this.totalMoneyFilm
          },
        ],
      };
      Highcharts.chart('film', this.options);
    })
    this.statisticalCommonService.getAllTopMember(this.quarter, this.year).subscribe(value => {
      for (let i = 0; i < value.length; i++) {
        this.nameMember[i] = value[i].id + ' - ' + value[i].name
        this.totalTicketMember[i] = Number(value[i].totalTicket)
        this.totalMoneyMember[i] = Number(value[i].totalMoney)
        this.pointMember[i] = Number(value[i].point)
      }
      this.options = {
        chart: {
          height: 450,
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
          text: 'Danh s??ch TOP th??nh vi??n'
        },
        plotOptions: {
          series: {
            depth: 25,
          }
        },
        xAxis: {
          categories: this.nameMember,
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
            color: 'rgb(43, 144, 143)',
            tooltip: {
              pointFormat: '<tr><td style="color:{series.color};padding:8px;">{series.name}: </td>' +
                '<td style="padding:3px"><b>{point.y: f} v??</b></td></tr>',
            },
            data: this.totalTicketMember,
          },
          {
            name: 'T???ng ti???n',
            color: 'rgb(145, 232, 225)',
            tooltip: {
              pointFormat: '<tr><td style="color:{series.color};padding:8px">{series.name}: </td>' +
                '<td style="padding:3px"><b>{point.y: f} ?????ng</b></td></tr>',
            },
            data: this.totalMoneyMember,
          },
          {
            name: '??i???m t??ch l??y',
            color: 'rgb(128, 133, 233)',
            tooltip: {
              pointFormat: '<tr><td style="color:{series.color};padding:8px">{series.name}: </td>' +
                '<td style="padding:3px"><b>{point.y: f} ??i???m</b></td></tr>',
            },
            data: this.pointMember
          },
        ],
      };
      Highcharts.chart('member', this.options);
      this.statisticalCommonService.getRevenueByMonth().subscribe(value2 => {
        for (let i = 0; i < value2.length; i++) {
          this.date[i] = value2[i].date
          this.totelMoneyRevenue[i] = Number(value2[i].totalMoney)
        }
        this.options = {
          chart: {
            height: 500,
            type: 'spline',
          },
          credits: {
            enabled: false,
          },
          title: {
            text: 'Doanh thu th??ng 3',
          },
          yAxis: {
            lineColor: '#fff',
            title: {
              text: 'VND ?????ng'
            }
          },
          legend: {
            enabled: false,
          },
          xAxis: {
            lineColor: 'rgb(145, 232, 225)',
            categories: this.date,
          },
          plotOptions: {
            series: {
              borderRadius: 5,
            } as any,
          },
          series: [
            {
              name: 'Doanh thu',
              type: 'spline',
              color: 'rgb(145, 232, 225)',
              data: this.totelMoneyRevenue,
            },
          ],
        }
        Highcharts.chart('revenue', this.options);
      })
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'L???i',
        text: 'Kh??ng c?? d??? li???u cho l???a ch???n c???a b???n',
      })
    })
  }
}
