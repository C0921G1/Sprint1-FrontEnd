import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmManagementEditComponent } from './film-management-edit.component';

describe('FilmManagementEditComponent', () => {
  let component: FilmManagementEditComponent;
  let fixture: ComponentFixture<FilmManagementEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmManagementEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmManagementEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
