import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientparticulierComponent } from './clientparticulier.component';

describe('ClientparticulierComponent', () => {
  let component: ClientparticulierComponent;
  let fixture: ComponentFixture<ClientparticulierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientparticulierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientparticulierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
