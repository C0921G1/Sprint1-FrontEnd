import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberInformationManagementComponent } from './member-information-management.component';

describe('MemberInformationManagementComponent', () => {
  let component: MemberInformationManagementComponent;
  let fixture: ComponentFixture<MemberInformationManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberInformationManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberInformationManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
