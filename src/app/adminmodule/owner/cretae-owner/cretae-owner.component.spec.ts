import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CretaeOwnerComponent } from './cretae-owner.component';

describe('CretaeOwnerComponent', () => {
  let component: CretaeOwnerComponent;
  let fixture: ComponentFixture<CretaeOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CretaeOwnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CretaeOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
