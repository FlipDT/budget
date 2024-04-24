import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../services/api.services';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(private apiService: ApiService) {}

  register(registerForm: NgForm) {
    if (registerForm.invalid) {
      return;
    }

    this.apiService.register(registerForm.value).subscribe((res) => {
        console.log(res);
      });
    }
  }

