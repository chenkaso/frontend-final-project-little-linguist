import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Category } from '../../shared/model/category';
import { GameCardComponent } from '../game-card/game-card.component';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-game-view',
  standalone: true,
  imports: [GameCardComponent, RouterModule, CommonModule, MatButtonModule],
  templateUrl: './game-view.component.html',
  styleUrl: './game-view.component.css',
})
export class GameViewComponent {
  allCategory: Category[] = [];
  constructor(private categoriesService: CategoriesService) {}
  ngOnInit(): void {
    this.categoriesService.list().then((result: Category[]) => {
      this.allCategory = result;
    });
  }
}
