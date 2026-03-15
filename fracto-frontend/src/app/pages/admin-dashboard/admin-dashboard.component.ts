import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  users = signal<any[]>([]);
  appointments = signal<any[]>([]);
  successMessage = signal('');
  errorMessage = signal('');

  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7096/api';

  ngOnInit() {
    this.loadUsers();
    this.loadAppointments();
  }

  loadUsers() {
    this.http.get<any[]>(`${this.apiUrl}/User`).subscribe({
      next: (response) => {
        this.users.set(response);
      },
      error: () => {
        this.errorMessage.set('Could not load users.');
      }
    });
  }

  loadAppointments() {
    this.http.get<any[]>(`${this.apiUrl}/Appointment`).subscribe({
      next: (response) => {
        this.appointments.set(response);
      },
      error: () => {
        this.errorMessage.set('Could not load appointments.');
      }
    });
  }

  deleteUser(userId: number) {
    this.http.delete(`${this.apiUrl}/User/${userId}`).subscribe({
      next: () => {
        this.successMessage.set('User deleted successfully.');
        this.loadUsers();
      },
      error: () => {
        this.errorMessage.set('Could not delete user.');
      }
    });
  }

  confirmAppointment(appointmentId: number) {
    this.http.put(`${this.apiUrl}/Appointment/confirm/${appointmentId}`, {}).subscribe({
      next: () => {
        this.successMessage.set('Appointment confirmed.');
        this.loadAppointments();
      },
      error: () => {
        this.errorMessage.set('Could not confirm appointment.');
      }
    });
  }

  cancelAppointment(appointmentId: number) {
    this.http.put(`${this.apiUrl}/Appointment/cancel/${appointmentId}`, {}).subscribe({
      next: () => {
        this.successMessage.set('Appointment cancelled.');
        this.loadAppointments();
      },
      error: () => {
        this.errorMessage.set('Could not cancel appointment.');
      }
    });
  }
}