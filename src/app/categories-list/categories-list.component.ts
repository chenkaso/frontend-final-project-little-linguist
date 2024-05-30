import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { Category } from '../../shared/model/category';
import { DeleteCategoryDialogComponent } from '../delete-category-dialog/delete-category-dialog.component';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.css',
})
export class CategoriesListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'numOfWords',
    'lastUpdateDate',
    'actions',
  ];
  dataSource: Category[] = [];

  constructor(
    private categoriesService: CategoriesService,
    private dialogService: MatDialog
  ) {}

  ngOnInit(): void {
    this.categoriesService
      .list()
      .then((result: Category[]) => (this.dataSource = result));
  }

  deleteCategory(id: string, name: string) {
    const dialogRef = this.dialogService.open(DeleteCategoryDialogComponent, {
      data: name,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.categoriesService.delete(id).then(() => {
          this.categoriesService
            .list()
            .then((result: Category[]) => (this.dataSource = result));
        });
      }
    });
  }
}
