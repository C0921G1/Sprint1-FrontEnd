import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmManagementCreateComponent } from './film-management-create.component';

describe('FilmManagementCreateComponent', () => {
  let component: FilmManagementCreateComponent;
  let fixture: ComponentFixture<FilmManagementCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmManagementCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmManagementCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
