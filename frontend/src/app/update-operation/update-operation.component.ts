import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Category } from '../model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../services/api.services';

@Component({
  selector: 'app-update-operation',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './update-operation.component.html',
  styleUrl: './update-operation.component.scss',
})
export class UpdateOperationComponent {
  title!: string;
  description!: string;
  amount!: number;
  categories: Category[] = [];
  selectedCategory!: Category;
  operationId: number;

  constructor(
    public dialogRef: MatDialogRef<UpdateOperationComponent>,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.getCategories();
    this.operationId = data.operationId;
  }

  updateOperation() {
  
    this.apiService
      .updateOperation(
        this.title,
        this.description,
        this.amount,
        this.selectedCategory.id,
        this.operationId
      )
      .subscribe(() => {
        this.dialogRef.close();
      });
  }

  getCategories() {
    this.apiService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  onCancel() {
    this.dialogRef.close();
  }
}
