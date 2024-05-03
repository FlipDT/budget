import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ApiService } from '../services/api.services';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent {
  name!: string;

  constructor(
    public dialogRef: MatDialogRef<CategoryComponent>,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}



  onCancel() {
    this.dialogRef.close();
  }

  createCategory() {
    console.log(
      this.name
    );
    this.apiService
      .createCategory(
        this.name
      )
      .subscribe(() => {
        this.dialogRef.close();
      });
  }
}
