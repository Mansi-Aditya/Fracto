import { TestBed } from '@angular/core/testing';
import { MyAppointmentsComponent } from './my-appointments.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('MyAppointmentsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyAppointmentsComponent],
      providers: [provideHttpClient(), provideRouter([])]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(MyAppointmentsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});