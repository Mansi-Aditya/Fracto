
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private apiUrl = 'https://localhost:7096/api/Appointment';

  constructor(private http: HttpClient) { }

  getSlots(doctorId: number, date: string) {
    return this.http.get(`${this.apiUrl}/slots?doctorId=${doctorId}&date=${date}`);
  }

  bookAppointment(appointment: any) {
    return this.http.post(`${this.apiUrl}`, appointment);
  }

  getUserAppointments(userId: number) {
    return this.http.get(`${this.apiUrl}/user/${userId}`);
  }

  cancelAppointment(id: number) {
    return this.http.put(`${this.apiUrl}/cancel/${id}`, {});
  }
}