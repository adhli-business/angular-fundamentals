import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCreditur } from './add-creditur';

describe('AddCreditur', () => {
  let component: AddCreditur;
  let fixture: ComponentFixture<AddCreditur>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCreditur]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCreditur);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
