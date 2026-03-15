import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

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
    if (this.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters.';
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
        this.router.navigate(['/search']);
      },
      error: (err: any) => {
        this.errorMessage = 'Invalid email or password.';
      }
    });
  }
}