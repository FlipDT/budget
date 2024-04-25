import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ApiService } from '../services/api.services';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(private fb: FormBuilder, private apiService: ApiService) {}

  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  register() {
    if (this.form.invalid) {
      return;
    }
    const { username, password } = this.form.value;

    if (!username || !password) {
      return;
    }

    console.log('Registering user', username, password)
    this.apiService.register(username, password);
  }
}
