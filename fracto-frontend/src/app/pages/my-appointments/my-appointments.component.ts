import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-my-appointments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-appointments.component.html',
  styleUrls: ['./my-appointments.component.css']
})
export class MyAppointmentsComponent {

  userId = 0;
  appointments = signal<any[]>([]);
  successMessage = signal('');
  errorMessage = signal('');

  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7096/api';

  getAppointments() {
    if (this.userId == 0) {
      this.errorMessage.set('Please enter your User ID.');
      return;
    }

    this.errorMessage.set('');
    this.http.get<any[]>(`${this.apiUrl}/Appointment/user/${this.userId}`).subscribe({
      next: (response) => {
        this.appointments.set(response);
        if (response.length == 0) {
          this.errorMessage.set('No appointments found.');
        }
      },
      error: () => {
        this.errorMessage.set('No appointments found.');
        this.appointments.set([]);
      }
    });
  }

  cancelAppointment(appointmentId: number) {
    this.http.put(`${this.apiUrl}/Appointment/cancel/${appointmentId}`, {}, { responseType: 'text' }).subscribe({
      next: () => {
        this.successMessage.set('Appointment cancelled successfully!');
        this.getAppointments();
      },
      error: () => {
        this.errorMessage.set('Could not cancel appointment.');
      }
    });
  }
}