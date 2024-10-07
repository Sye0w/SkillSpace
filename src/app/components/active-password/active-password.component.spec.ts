import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivePasswordComponent } from './active-password.component';

describe('ActivePasswordComponent', () => {
  let component: ActivePasswordComponent;
  let fixture: ComponentFixture<ActivePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivePasswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
