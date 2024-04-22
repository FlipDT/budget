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

  constructor(private http: HttpClient) {}

  // ngOnInit(): void {
  //   this.fetchDataFromBackend();
  // }

  // fetchDataFromBackend(): void {
  //   this.http.get<any>('http://localhost:3000/budget/operations').subscribe(
  //     (data: any) => {
       
  //       this.entriesAndExpenses = data;
  //     },
  //     (error) => {
  //       console.error('Une erreur s\'est produite lors de la récupération des données:', error);
  //     }
  //   );
  // }

  onDateSelected(event: MatDatepickerInputEvent<Date>) {
    this.startDate = event.value;
  }

  entriesAndExpenses: { entry: string; expense: number }[] = [];
  dropdownOptions: string[] = ['Option 1', 'Option 2', 'Option 3'];

  addEntryAndExpense(entry: string, expense: number) {
    this.entriesAndExpenses.push({ entry, expense });
  }
}
