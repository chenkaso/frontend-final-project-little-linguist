import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Category } from '../../shared/model/category';
import { GamePlayed } from '../../shared/model/gameplayed';
import { CategoriesService } from '../services/categories.service';
import { PointsService } from '../services/points.service';

@Component({
  selector: 'app-game-details',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './game-details.component.html',
  styleUrl: './game-details.component.css',
})
export class GameDetailsComponent {
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
  avgGameSec: number = 0;
  totalGameSec: number = 0;
  SecPlayed: number[] = [];
  secLeftToGame: number[] = [];
  gamesEndInTime: number = 0;
  isLoadingDone = false;

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
          this.SecPlayed.push(this.pointsMap[i].secondsPlayed);
          this.secLeftToGame.push(this.pointsMap[i].secondsLeftInGame);
          this.sumTotalPoints = this.sumTotalPoints + this.playerTotalPoints[i];
          this.gameCounter = this.pointsMap.length;

          const categoryId = this.pointsMap[i].categoryId;
          let categoryAlreadyCounted = false;
          for (let i = 0; i < this.categoriesCounted.length; i++) {
            if (this.categoriesCounted[i] === categoryId) {
              categoryAlreadyCounted = true;
              break;
            } else {
              this.categoriesCounted.push(categoryId);
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
        console.log(this.sumTotalPoints);
        for (let i = 0; i < this.SecPlayed.length; i++) {
          this.totalGameSec = this.SecPlayed[i] + this.totalGameSec;
        }
        this.avgGameSec = this.totalGameSec / this.gameCounter;
        console.log(this.totalGameSec);
        console.log(this.SecPlayed.length);

        if (this.secLeftToGame.length > 0) {
          for (let i = 0; i < this.secLeftToGame.length; i++) {
            this.gamesEndInTime = (i / this.secLeftToGame.length) * 100;
          }
        }
        return this.gamesEndInTime;
      });
    });
  }
}
