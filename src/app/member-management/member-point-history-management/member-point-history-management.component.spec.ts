import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberPointHistoryManagementComponent } from './member-point-history-management.component';

describe('MemberPointHistoryManagementComponent', () => {
  let component: MemberPointHistoryManagementComponent;
  let fixture: ComponentFixture<MemberPointHistoryManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberPointHistoryManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberPointHistoryManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
