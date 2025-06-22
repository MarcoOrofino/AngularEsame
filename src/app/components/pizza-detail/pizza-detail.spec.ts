import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaDetail } from './pizza-detail';

describe('PizzaDetail', () => {
  let component: PizzaDetail;
  let fixture: ComponentFixture<PizzaDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PizzaDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PizzaDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
