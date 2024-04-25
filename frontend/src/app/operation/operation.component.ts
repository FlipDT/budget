import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApiService } from '../services/api.services';
import { MatSelectModule } from '@angular/material/select';
import { Category } from '../model';

@Component({
  selector: 'app-operation',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './operation.component.html',
  styleUrl: './operation.component.scss',
})
export class OperationComponent {
  title!: string;
  description!: string;
  amount!: number;
  categories: Category[] = [];
  selectedCategory!: Category;

  constructor(
    public dialogRef: MatDialogRef<OperationComponent>,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.getCategories();
  }
  
  getCategories() {
    this.apiService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
      console.log(categories)
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  createOperation() {
    console.log(this.title, this.description, this.amount, this.selectedCategory.id);
    this.apiService.createOperation(this.title, this.description, this.amount, this.selectedCategory.id).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
