import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-doctor-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctor-search.component.html',
  styleUrls: ['./doctor-search.component.css']
})
export class DoctorSearchComponent {

  city = '';
  specializationId = 0;
  doctors = signal<any[]>([]);
  errorMessage = signal('');
  successMessage = signal('');

  ratingDoctorId = 0;
  ratingUserId = 0;
  ratingValue = 0;

  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7096/api';

  search() {
    this.errorMessage.set('');
    this.successMessage.set('');
    this.http.get<any[]>(`${this.apiUrl}/Doctor/search?city=${this.city}&specializationId=${this.specializationId}`).subscribe({
      next: (response) => {
        this.doctors.set(response);
        this.errorMessage.set('');
      },
      error: () => {
        this.errorMessage.set('No doctors found.');
        this.doctors.set([]);
      }
    });
  }

  submitRating() {
    if (this.ratingValue < 1 || this.ratingValue > 5) {
      this.errorMessage.set('Rating must be between 1 and 5.');
      return;
    }

    this.errorMessage.set('');
    this.successMessage.set('');

    const rating = {
      doctorId: this.ratingDoctorId,
      userId: this.ratingUserId,
      ratingScore: this.ratingValue
    };

    this.http.post(`${this.apiUrl}/Rating`, rating, { responseType: 'text' }).subscribe({
      next: (response: any) => {
        alert('Rating submitted successfully!');
      },
      error: (err: any) => {
        alert('Could not submit rating: ' + err.error);
      }
    });
  }
}