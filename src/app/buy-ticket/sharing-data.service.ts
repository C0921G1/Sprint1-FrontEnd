import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {
  public subject = new BehaviorSubject<any>(null);
  obj = this.subject.asObservable();

  getDataFromFirstComponent(x: any){
    this.subject.next(x);
  }
  sharedDataWithSecondComponent(){
    return this.subject.asObservable();
  }

  sendObj(){
    console.log(this.obj);
    return this.obj;
  }
  constructor() { }
}
