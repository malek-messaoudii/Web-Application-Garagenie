import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdvpComponent } from './rdvp.component';

describe('RdvpComponent', () => {
  let component: RdvpComponent;
  let fixture: ComponentFixture<RdvpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdvpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RdvpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
