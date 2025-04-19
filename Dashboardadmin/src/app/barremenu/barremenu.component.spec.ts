import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarremenuComponent } from './barremenu.component';

describe('BarremenuComponent', () => {
  let component: BarremenuComponent;
  let fixture: ComponentFixture<BarremenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarremenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarremenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
