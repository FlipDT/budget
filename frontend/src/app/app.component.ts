import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.services';
import { jwtDecode } from 'jwt-decode';
//import { ApiService } from './services/api.services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, CommonModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontend';
  showMenu: boolean = true;
  username: string = '';
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.jwtUserToken.subscribe((token) => {
      if (token) {
        const decoded: any = jwtDecode(token);
        this.username = decoded.username;
      }

      if (this.username) {
        this.showMenu = false;
      } else {
        this.showMenu = true;
      }
    });
  }

  logout() {
    this.username = '';
    this.username = this.apiService.logout();
  }
}
