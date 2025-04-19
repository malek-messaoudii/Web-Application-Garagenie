import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionsadminComponent } from './promotionsadmin.component';

describe('PromotionsadminComponent', () => {
  let component: PromotionsadminComponent;
  let fixture: ComponentFixture<PromotionsadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotionsadminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromotionsadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
