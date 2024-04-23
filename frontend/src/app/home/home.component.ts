import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatDatepickerInputEvent,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { Operation } from './operation.interface';
import { ApiService } from '../services/api.services';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTableModule,
    CommonModule,
    MatButtonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  startDate: Date | null = null;
  entriesAndExpenses: Operation[] = [];
  operations: any[] = [];

  constructor(private http: HttpClient, private apiService: ApiService) {}

  onDateSelected(event: MatDatepickerInputEvent<Date>) {
    this.startDate = event.value;
  }

  dropdownOptions: string[] = ['Option 1', 'Option 2', 'Option 3'];

  addEntryAndExpense(operation: Operation) {
    this.entriesAndExpenses.push(operation);
  }

  fetchDataFromBackend(): void {
    this.apiService.getAllOperations().subscribe(
      (data: any) => {
        this.operations = data;
        console.log('Données récupérées depuis le backend :', this.operations);
      },
      (error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération des données:",
          error
        );
      }
    );
  }
}
