import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilisateursadminComponent } from './utilisateursadmin.component';

describe('UtilisateursadminComponent', () => {
  let component: UtilisateursadminComponent;
  let fixture: ComponentFixture<UtilisateursadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UtilisateursadminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UtilisateursadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
