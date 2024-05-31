import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Category } from '../../shared/model/category';
import { GamePlayed } from '../../shared/model/gameplayed';
import { GameDetailsComponent } from '../game-details/game-details.component';
import { CategoriesService } from '../services/categories.service';
import { PointsService } from '../services/points.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  imports: [GameDetailsComponent, CommonModule],
})
export class DashboardComponent implements OnInit {
  pointsMap: GamePlayed[] = [];
  playerTotalPoints: number[] = [];
  sumTotalPoints: number = 0;
  gameCounter: number = 0;
  categoriesPalyed: number[] = [];
  categoryCounter: number = 0;
  currentCategory?: number;
  categoriesCounted: string[] = [];
  categoriesNotPalyed: number = 0;
  allCategories: Category[] = [];
  

  constructor(
    private PointsService: PointsService,
    private categoryservice: CategoriesService
  ) {}
  ngOnInit(): void {
    this.categoryservice.list().then((result: Category[]) => {
      this.allCategories = result;
      this.PointsService.list().then((result: GamePlayed[]) => {
        this.pointsMap = result;
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
      });
    });

    console.log(this.sumTotalPoints);
  }
}
