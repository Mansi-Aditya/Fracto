import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  username = '';
  email = '';
  password = '';
  errorMessage = '';
  successMessage = '';

  private authService = inject(AuthService);
  private router = inject(Router);

  register() {
    // client side validation
    if (this.username == '') {
      this.errorMessage = 'Username is required.';
      return;
    }
    if (this.email == '') {
      this.errorMessage = 'Email is required.';
      return;
    }
    if (this.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters.';
      return;
    }

    const user = {
      username: this.username,
      email: this.email,
      passwordHash: this.password,
      role: 'User',
      profileImage: ''
    };

    this.authService.register(user).subscribe({
      next: (response: any) => {
        this.successMessage = 'Registration successful! Please login.';
        this.errorMessage = '';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err: any) => {
        this.errorMessage = 'Email already registered.';
      }
    });
  }
}