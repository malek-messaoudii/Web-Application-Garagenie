import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifadminComponent } from './modifadmin.component';

describe('ModifadminComponent', () => {
  let component: ModifadminComponent;
  let fixture: ComponentFixture<ModifadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifadminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
