import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-book-appointment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent {

  doctorId = 0;
  userId = 0;
  appointmentDate = '';
  timeSlot = '';
  availableSlots = signal<any[]>([]);
  successMessage = signal('');
  errorMessage = signal('');

  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7096/api';

  getSlots() {
    if (this.doctorId == 0) {
      this.errorMessage.set('Please enter a Doctor ID.');
      return;
    }
    if (this.appointmentDate == '') {
      this.errorMessage.set('Please select a date.');
      return;
    }

    this.errorMessage.set('');
    // this took me a while to figure out
    const formattedDate = new Date(this.appointmentDate).toISOString().split('T')[0];

    this.http.get<any[]>(
      `${this.apiUrl}/Appointment/slots?doctorId=${this.doctorId}&date=${formattedDate}`
    ).subscribe({
      next: (response) => {
        this.availableSlots.set(response);
        if (response.length == 0) {
          this.errorMessage.set('No slots available for this date.');
        }
      },
      error: () => {
        this.errorMessage.set('Could not fetch slots.');
      }
    });
  }

  bookAppointment() {
    if (this.userId == 0) {
      this.errorMessage.set('Please enter your User ID.');
      return;
    }
    if (this.timeSlot == '') {
      this.errorMessage.set('Please select a time slot.');
      return;
    }

    this.errorMessage.set('');
    this.successMessage.set('');

    const formattedDate = new Date(this.appointmentDate).toISOString().split('T')[0];

    const appointment = {
      userId: this.userId,
      doctorId: this.doctorId,
      appointmentDate: formattedDate,
      timeSlot: this.timeSlot,
      status: 'Pending'
    };

    this.http.post(`${this.apiUrl}/Appointment`, appointment, { responseType: 'text' }).subscribe({
      next: () => {
        this.successMessage.set('Appointment booked successfully!');
        this.availableSlots.set([]);
        this.timeSlot = '';
      },
      error: () => {
        this.errorMessage.set('Could not book appointment. Slot may already be taken.');
      }
    });
  }
}