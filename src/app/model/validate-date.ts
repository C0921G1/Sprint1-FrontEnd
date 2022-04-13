import {AbstractControl} from '@angular/forms';
import {differenceInDays} from "date-fns";

export class ValidateDate {

  checkStartDate(abstractControl: AbstractControl) : any{
    //  let today  = new Date();
    //  let  date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    //
    // const dateStart = dateS.value;
    //
    // return dateStart.getTime >  date ? null : {checkStartDateOk: true}

    const startDateInput = abstractControl.value;
    // console.log(startDateInput);

    const startDate = new Date(startDateInput);
    const now = new Date();
    console.log(startDate);
    console.log(now);

    const days = differenceInDays(startDate,now);
    console.log(days);

    return (days >= 0) ? null : {checkStartDateOk: true};

  }
// checkEndDate(dateE : AbstractControl){
// const endDay = dateE.value
//   let today  = new Date();
//   let  date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
//
//   return endDay.getTime > this.dateO.getTime ? null : {checkEndDateOk: true};
// }


  constructor() {
  }

  // checkFilmDate(startDateInput: string, endDateInput: string): boolean {
  //   const startDate = new Date(startDateInput);
  //   const endDate = new Date(endDateInput);
  //
  //   const days = differenceInDays(endDate,startDate);
  //
  //   return (days > 0);
  // }


}
