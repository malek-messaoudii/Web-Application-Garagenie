import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesadminComponent } from './messagesadmin.component';

describe('MessagesadminComponent', () => {
  let component: MessagesadminComponent;
  let fixture: ComponentFixture<MessagesadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessagesadminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagesadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
