import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingSeatSelectionComponent } from './booking-seat-selection.component';

describe('BookingSeatSelectionComponent', () => {
  let component: BookingSeatSelectionComponent;
  let fixture: ComponentFixture<BookingSeatSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingSeatSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingSeatSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
