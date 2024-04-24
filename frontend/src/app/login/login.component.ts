import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../services/api.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.apiService.jwtUserToken.subscribe((token) => {
      if (token) {
        this.router.navigateByUrl('/').then();
      }
    });
  }

  login(loginForm: NgForm) {
    if (loginForm.invalid) {
      return;
    }
    const { username, password } = loginForm.value;
    this.apiService.login(username, password);
    return loginForm.reset();
  }
}
