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
  entries: any[] = [];
  expenses: any[] = []

  constructor(private http: HttpClient, private apiService: ApiService) {
    this.fetchDataFromBackend();
  }

  onDateSelected(event: MatDatepickerInputEvent<Date>) {
    this.startDate = event.value;
  }

  dropdownOptions: string[] = ['Option 1', 'Option 2', 'Option 3'];

  addEntryAndExpense(operation: Operation) {
    this.entriesAndExpenses.push(operation);
  }

  splitOperations(operations: any[]) {
    const entries = operations.filter(op => op.amount >= 0);
    const expenses = operations.filter(op => op.amount < 0);
    return { entries, expenses };
  }

  // Appeler cette méthode lorsque les données sont récupérées
  fetchDataFromBackend(): void {
    this.apiService.getAllOperations().subscribe(
      (data: any[]) => {
        // Diviser les opérations en entrées et dépenses
        const { entries, expenses } = this.splitOperations(data);
        
        // Assigner les entrées et dépenses aux propriétés correspondantes
        this.entries = entries;
        this.expenses = expenses;

        console.log('Entrées:', this.entries);
        console.log('Dépenses:', this.expenses);
      },
      (error) => {
        console.error("Une erreur s'est produite lors de la récupération des données:", error);
      }
    );
  }
}
