import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
  styleUrls: ['./game-details.component.css'],
})
export class GameDetailsComponent implements OnInit {
  pointsMap: GamePlayed[] = [];
  playerTotalPoints: number[] = [];
  sumTotalPoints: number = 0;
  gameCounter: number = 0;
  categoriesPlayed: string[] = [];
  currentCategory?: number;
  categoriesNotPlayed: number = 0;
  allCategories: Category[] = [];
  avgGameSec: number = 0;
  totalGameSec: number = 0;
  secPlayed: number[] = [];
  secLeftToGame: number[] = [];
  gamesEndInTime: number = 0;
  isLoadingDone = false;

  categoryAlreadyCounted = false;

  constructor(
    private pointsService: PointsService,
    private categoryService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.categoryService.list().then((categories: Category[]) => {
      this.allCategories = categories;
      this.pointsService.list().then((games: GamePlayed[]) => {
        this.pointsMap = games;
        this.gameCounter = games.length;

        games.forEach((game) => {
          this.playerTotalPoints.push(game.points);
          this.secPlayed.push(game.secondsPlayed);
          this.secLeftToGame.push(game.secondsLeftInGame);
          if (!this.categoriesPlayed.includes(game.categoryId)) {
            this.categoriesPlayed.push(game.categoryId);
          }

          this.sumTotalPoints += game.points;
          this.totalGameSec += game.secondsPlayed;
        });
        if (this.secLeftToGame.length > 0) {
          for (let i = 0; i < this.secLeftToGame.length; i++) {
            this.gamesEndInTime = (i / this.secLeftToGame.length) * 100;
          }
        }

        this.avgGameSec = this.totalGameSec / this.gameCounter;
        this.categoriesNotPlayed =
          this.allCategories.length - this.categoriesPlayed.length;

        this.isLoadingDone = true;
      });
    });
  }
}
