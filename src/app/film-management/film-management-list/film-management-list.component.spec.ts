import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmManagementListComponent } from './film-management-list.component';

describe('FilmManagementListComponent', () => {
  let component: FilmManagementListComponent;
  let fixture: ComponentFixture<FilmManagementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmManagementListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmManagementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
