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
  doctors = signal<any[]>([]);
  specializations = signal<any[]>([]);
  successMessage = signal('');
  errorMessage = signal('');
  isEditing = signal(false);
  editingDoctorId = signal(0);
  newSpecialization = signal('');

  doctorForm = signal({
    name: '',
    city: '',
    specializationId: 0
  });

  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7096/api';

  ngOnInit() {
    this.loadUsers();
    this.loadAppointments();
    this.loadDoctors();
    this.loadSpecializations();
  }

  loadUsers() {
    this.http.get<any[]>(`${this.apiUrl}/User`).subscribe({
      next: (response) => { this.users.set(response); },
      error: () => { this.errorMessage.set('Could not load users.'); }
    });
  }

  loadAppointments() {
    this.http.get<any[]>(`${this.apiUrl}/Appointment`).subscribe({
      next: (response) => { this.appointments.set(response); },
      error: () => { this.errorMessage.set('Could not load appointments.'); }
    });
  }

  loadDoctors() {
    this.http.get<any[]>(`${this.apiUrl}/Doctor`).subscribe({
      next: (response) => { this.doctors.set(response); },
      error: () => { this.errorMessage.set('Could not load doctors.'); }
    });
  }

  loadSpecializations() {
    this.http.get<any[]>(`${this.apiUrl}/Specialization`).subscribe({
      next: (response) => { this.specializations.set(response); },
      error: () => { this.errorMessage.set('Could not load specializations.'); }
    });
  }

  deleteUser(userId: number) {
    this.http.delete(`${this.apiUrl}/User/${userId}`, { responseType: 'text' }).subscribe({
      next: () => {
        this.successMessage.set('User deleted successfully.');
        this.loadUsers();
      },
      error: () => { this.errorMessage.set('Could not delete user.'); }
    });
  }

  confirmAppointment(appointmentId: number) {
    this.http.put(`${this.apiUrl}/Appointment/confirm/${appointmentId}`, {}, { responseType: 'text' }).subscribe({
      next: () => {
        this.successMessage.set('Appointment confirmed.');
        this.loadAppointments();
      },
      error: () => { this.errorMessage.set('Could not confirm appointment.'); }
    });
  }

  cancelAppointment(appointmentId: number) {
    this.http.put(`${this.apiUrl}/Appointment/cancel/${appointmentId}`, {}, { responseType: 'text' }).subscribe({
      next: () => {
        this.successMessage.set('Appointment cancelled.');
        this.loadAppointments();
      },
      error: () => { this.errorMessage.set('Could not cancel appointment.'); }
    });
  }

  editDoctor(doctor: any) {
    this.isEditing.set(true);
    this.editingDoctorId.set(doctor.doctorId);
    this.doctorForm.set({
      name: doctor.name,
      city: doctor.city,
      specializationId: doctor.specializationId
    });
  }

  cancelEdit() {
    this.isEditing.set(false);
    this.editingDoctorId.set(0);
    this.doctorForm.set({ name: '', city: '', specializationId: 0 });
  }

  saveDoctor() {
    if (this.doctorForm().name == '') {
      this.errorMessage.set('Doctor name is required.');
      return;
    }

    if (this.isEditing()) {
      this.http.put(`${this.apiUrl}/Doctor/${this.editingDoctorId()}`,
        this.doctorForm(), { responseType: 'text' }).subscribe({
        next: () => {
          this.successMessage.set('Doctor updated successfully.');
          this.cancelEdit();
          this.loadDoctors();
        },
        error: () => { this.errorMessage.set('Could not update doctor.'); }
      });
    } else {
      this.http.post(`${this.apiUrl}/Doctor`,
        this.doctorForm(), { responseType: 'text' }).subscribe({
        next: () => {
          this.successMessage.set('Doctor added successfully.');
          this.doctorForm.set({ name: '', city: '', specializationId: 0 });
          this.loadDoctors();
        },
        error: () => { this.errorMessage.set('Could not add doctor.'); }
      });
    }
  }

  deleteDoctor(doctorId: number) {
    this.http.delete(`${this.apiUrl}/Doctor/${doctorId}`, { responseType: 'text' }).subscribe({
      next: () => {
        this.successMessage.set('Doctor deleted successfully.');
        this.loadDoctors();
      },
      error: () => { this.errorMessage.set('Could not delete doctor.'); }
    });
  }

  addSpecialization() {
    if (this.newSpecialization() == '') {
      this.errorMessage.set('Specialization name is required.');
      return;
    }

    const spec = { specializationName: this.newSpecialization() };
    this.http.post(`${this.apiUrl}/Specialization`, spec, { responseType: 'text' }).subscribe({
      next: () => {
        this.successMessage.set('Specialization added successfully.');
        this.newSpecialization.set('');
        this.loadSpecializations();
      },
      error: () => { this.errorMessage.set('Could not add specialization.'); }
    });
  }

  deleteSpecialization(id: number) {
    this.http.delete(`${this.apiUrl}/Specialization/${id}`, { responseType: 'text' }).subscribe({
      next: () => {
        this.successMessage.set('Specialization deleted successfully.');
        this.loadSpecializations();
      },
      error: () => { this.errorMessage.set('Could not delete specialization.'); }
    });
  }
}