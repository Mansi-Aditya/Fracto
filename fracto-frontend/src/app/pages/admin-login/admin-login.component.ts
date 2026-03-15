import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {

  email = '';
  password = '';
  errorMessage = '';

  private authService = inject(AuthService);
  private router = inject(Router);

  login() {
    if (this.email == '') {
      this.errorMessage = 'Email is required.';
      return;
    }
    if (this.password == '') {
      this.errorMessage = 'Password is required.';
      return;
    }

    const user = {
      email: this.email,
      passwordHash: this.password,
      username: '',
      role: '',
      profileImage: ''
    };

    this.authService.login(user).subscribe({
      next: (response: any) => {
        this.authService.saveToken(response.token);
        this.router.navigate(['/admin-dashboard']);
      },
      error: (err: any) => {
        this.errorMessage = 'Invalid email or password.';
      }
    });
  }
}