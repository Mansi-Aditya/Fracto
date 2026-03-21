import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DoctorSearchComponent } from './pages/doctor-search/doctor-search.component';
import { BookAppointmentComponent } from './pages/book-appointment/book-appointment.component';
import { RegisterComponent } from './pages/register/register.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { MyAppointmentsComponent } from './pages/my-appointments/my-appointments.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'search', component: DoctorSearchComponent },
  { path: 'book', component: BookAppointmentComponent },
  { path: 'my-appointments', component: MyAppointmentsComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent }
];