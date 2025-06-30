import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../../shared/auth/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  errorMsg = '';
  loading = false;

  constructor(private authService: Auth, private router: Router) {
    // Reset error message when form changes
    this.loginForm.valueChanges.subscribe(() => {
      this.errorMsg = '';
    });
  }

  async onSubmit() {
    if (this.loginForm.invalid) {
      this.errorMsg = 'Username dan password wajib diisi!';
      return;
    }
    this.loading = true;
    const { username, password } = this.loginForm.value;
    const success = await this.authService.login(username ?? '', password ?? '');
    this.loading = false;
    if (success) {
      this.router.navigate(['/']);
    } else {
      this.errorMsg = 'Username atau password salah!';
    }
  }
}
