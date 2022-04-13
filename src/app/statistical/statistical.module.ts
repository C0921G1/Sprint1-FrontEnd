import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StatisticalCommonManagementComponent} from './statistical-common-management/statistical-common-management.component';
import {StatisticalFilmComponent} from './statistical-film/statistical-film.component';
import {StatisticalMemberComponent} from './statistical-member/statistical-member.component';
import {StatisticalRoutingModule} from "./statistical-routing.module";
import { HighchartsChartModule } from 'highcharts-angular';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [StatisticalCommonManagementComponent, StatisticalFilmComponent, StatisticalMemberComponent],
    imports: [
        CommonModule,
        StatisticalRoutingModule,
        HighchartsChartModule,
        FormsModule
    ]
})
export class StatisticalModule {
}
