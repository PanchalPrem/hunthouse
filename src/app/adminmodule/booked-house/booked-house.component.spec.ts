import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedHouseComponent } from './booked-house.component';

describe('BookedHouseComponent', () => {
  let component: BookedHouseComponent;
  let fixture: ComponentFixture<BookedHouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookedHouseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookedHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
