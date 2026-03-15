import { TestBed } from '@angular/core/testing';
import { BookAppointmentComponent } from './book-appointment.component';

describe('BookAppointmentComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookAppointmentComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(BookAppointmentComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});