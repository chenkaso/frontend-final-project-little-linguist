import { Component } from '@angular/core';
import { Category } from '../../shared/model/category';
import { CategoriesService } from '../services/categories.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GameCardComponent } from '../game-card/game-card.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-game-view',
  standalone: true,
  imports: [GameCardComponent, RouterModule, CommonModule, MatButtonModule],
  templateUrl: './game-view.component.html',
  styleUrl: './game-view.component.css'
})
export class GameViewComponent {
  allCategory: Category[] = [];
  constructor(private categoriesService: CategoriesService) {}
  ngOnInit(): void {
    this.allCategory = this.categoriesService.list();
  }
}
