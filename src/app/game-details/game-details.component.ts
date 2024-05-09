import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Category } from '../../shared/model/category';
import { GamePlayed } from '../../shared/model/gameplayed';
import { CategoriesService } from '../services/categories.service';
import { PointsService } from '../services/points.service';

@Component({
  selector: 'app-game-details',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './game-details.component.html',
  styleUrl: './game-details.component.css'
})
export class GameDetailsComponent {
  pointsMap: GamePlayed[] = [];
  playerTotalPoints: number[] = [];
  sumTotalPoints: number = 0;
  gameCounter: number = 0;
  categoriesPalyed: number[] = [];
  categoryCounter: number = 0;
  currentCategory?: number;
  categoriesCounted: number[] = [];
  categoriesNotPalyed: number = 0;
  allCategories: Category[] = [];

  constructor(
    private PointsService: PointsService,
    private categoryservice: CategoriesService
  ) {}
  ngOnInit(): void {
    this.pointsMap = this.PointsService.list();
    this.allCategories = this.categoryservice.list();

    for (let i = 0; i < this.pointsMap.length; i++) {
      this.playerTotalPoints.push(this.pointsMap[i].points);
      this.sumTotalPoints = this.sumTotalPoints + this.playerTotalPoints[i];
      this.gameCounter = this.pointsMap.length;

      const categoryId = this.pointsMap[i].categoryId;
      let categoryAlreadyCounted = false;
      for (let i = 0; i < this.categoriesCounted.length; i++) {
        if (this.categoriesCounted[i] === categoryId) {
          categoryAlreadyCounted = true;
          break;
        }
      }
      if (!categoryAlreadyCounted) {
        this.categoriesCounted.push(categoryId);
        this.categoryCounter++;
        this.categoriesNotPalyed =
          this.allCategories.length - this.categoriesCounted.length;
      }
    }
    console.log(this.sumTotalPoints);
  }
}

