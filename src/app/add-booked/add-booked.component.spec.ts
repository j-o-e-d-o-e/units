import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookedComponent } from './add-booked.component';

describe('AddBookedComponent', () => {
  let component: AddBookedComponent;
  let fixture: ComponentFixture<AddBookedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBookedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBookedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
