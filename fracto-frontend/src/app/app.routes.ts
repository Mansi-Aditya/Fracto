import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DoctorSearchComponent } from './pages/doctor-search/doctor-search.component';
import { BookAppointmentComponent } from './pages/book-appointment/book-appointment.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'search', component: DoctorSearchComponent },
  { path: 'book', component: BookAppointmentComponent }
];