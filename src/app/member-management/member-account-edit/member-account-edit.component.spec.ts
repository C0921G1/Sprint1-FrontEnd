import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberAccountEditComponent } from './member-account-edit.component';

describe('MemberAccountEditComponent', () => {
  let component: MemberAccountEditComponent;
  let fixture: ComponentFixture<MemberAccountEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberAccountEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberAccountEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
