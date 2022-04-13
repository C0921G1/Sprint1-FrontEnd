import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmManagementDeleteComponent } from './film-management-delete.component';

describe('FilmManagementDeleteComponent', () => {
  let component: FilmManagementDeleteComponent;
  let fixture: ComponentFixture<FilmManagementDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmManagementDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmManagementDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
