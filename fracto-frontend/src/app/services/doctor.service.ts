
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private apiUrl = 'https://localhost:7096/api/Doctor';

  constructor(private http: HttpClient) { }

  searchDoctors(city: string, specializationId: number) {
    return this.http.get(`${this.apiUrl}/search?city=${city}&specializationId=${specializationId}`);
  }

  filterByRating(minRating: number) {
    return this.http.get(`${this.apiUrl}/filter?minRating=${minRating}`);
  }

  getAllDoctors() {
    return this.http.get(`${this.apiUrl}`);
  }

  getDoctor(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}