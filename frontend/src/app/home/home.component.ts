import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatDatepickerInputEvent,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { Operation, Category } from '../model';
import { ApiService } from '../services/api.services';
import { OperationComponent } from '../operation/operation.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { MatIconModule } from '@angular/material/icon';
import { CategoryComponent } from '../category/category.component';

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
    OperationComponent,
    MatDialogModule,
    BaseChartDirective,
    MatIconModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  startDate: Date | null = null;
  entriesAndExpenses: Operation[] = [];
  categories: Category[] = [];
  operations: Operation[] = [];
  entries: Operation[] = [];
  expenses: Operation[] = [];
  filteredOperations: any[] = [];
  displayedColumns: string[] = [
    'createdDate',
    'amount',
    'title',
    'description',
    'categoryName',
    'actions',
  ];
  dataSource: MatTableDataSource<Operation>;

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private dialog: MatDialog
  ) {
    this.getAllOperations();
    this.getAllCategories();
    this.dataSource = new MatTableDataSource(this.operations);
  }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };

  public barChartLabels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
  ];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Entries' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Expenses' },
  ];

  onDateSelected(event: MatDatepickerInputEvent<Date>) {
    this.startDate = event.value;
  }

  addEntryAndExpense(operation: Operation) {
    this.entriesAndExpenses.push(operation);
  }

  splitOperations(operations: any[]) {
    const entries = operations.filter((op) => op.amount >= 0);
    const expenses = operations.filter((op) => op.amount < 0);
    return { entries, expenses };
  }

  mapCategoryName(categoryId: number): string {
    const category = this.categories.find((cat) => cat.id === categoryId);
    return category ? category.name : '';
  }

  getAllCategories(): void {
    this.apiService.getAllCategories().subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAllOperations(): void {
    this.apiService.getAllOperations().subscribe(
      (data: any) => {
        this.operations = data;
        this.operations.forEach((op) => {
          op.categoryName = this.mapCategoryName(op.categoryId);
        });
        const { entries, expenses } = this.splitOperations(data);
        this.entries = entries;
        this.expenses = expenses;
        this.dataSource.data = this.operations;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onClickRow(operation: Operation) {
    console.log(operation);
  }

  showOperation: boolean = false;

  addOperation() {
    this.showOperation = true;
    const dialogRef = this.dialog.open(OperationComponent, {
      width: '1000px',
      hasBackdrop: true,
      role: 'dialog',
      height: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('La fenêtre modale a été fermée.');
      this.showOperation = false;
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (!data) return;
      this.apiService
        .createOperation(
          data.title,
          data.description,
          data.amount,
          data.categoryId
        )
        .subscribe((result: any) => {
          console.log(result);
          this.operations.push(result);
          this.dataSource.data = this.operations;
        });
    });
  }

  showCategory: boolean = false;

  createCategory() {
    this.showCategory = true;
    const dialogRef = this.dialog.open(CategoryComponent, {
      width: '95pw',
      hasBackdrop: true,
      role: 'dialog',
      height: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('La fenêtre modale a été fermée.');
      this.showOperation = false;
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (!data) return;
      this.apiService.createCategory(data.name).subscribe((result: any) => {
        console.log(result);
        this.categories.push(result);
      });
    });
  }

  deleteOperation(id: number) {
    if (confirm('Voulez-vous supprimer l opération ?')) {
      this.apiService.deleteOperation(id).subscribe((res) => {
        if (res.success) {
          this.operations = this.operations.filter((t: any) => t.id !== id);
          this.dataSource.data = this.operations;
        }
      });
    }
  }
}
