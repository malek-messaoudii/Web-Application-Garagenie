import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevisadminComponent } from './devisadmin.component';

describe('DevisadminComponent', () => {
  let component: DevisadminComponent;
  let fixture: ComponentFixture<DevisadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevisadminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevisadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
