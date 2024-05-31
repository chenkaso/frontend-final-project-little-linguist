import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { Category } from '../../shared/model/category';
import { GamePlayed } from '../../shared/model/gameplayed';
import { TranslatedWord } from '../../shared/model/translated-word';
import { FailureDialogComponent } from '../failure-dialog/failure-dialog.component';
import { CategoriesService } from '../services/categories.service';
import { PointsService } from '../services/points.service';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { TimerComponent } from '../timer/timer.component';
import { ExitComponent } from "../exit/exit.component";

@Component({
    selector: 'app-messy-words',
    standalone: true,
    templateUrl: './messy-words.component.html',
    styleUrls: ['./messy-words.component.css'],
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        MatProgressBarModule,
        TimerComponent,
        ExitComponent
    ]
})
export class MessyWordsComponent implements OnInit {
  @Input()
  id?: string;
  currentcategory?: Category;
  randomCategory?: Category;
  name?: string;
  allCategories: Category[] = [];
  randomIndex = 0;
  endGame = false;
  result: boolean[] = [];
  guess: boolean[] = [];
  message = '';
  trueGuess = 0;
  displayedColumns: string[] = ['origin', 'category', 'guess', 'actions'];
  dataSource: TranslatedWord[] = [];
  totalPoints = 0;
  pointsPerWord = 0;
  readonly WORDS_PER_GAME = 3;
  gameWords: TranslatedWord[] = [];
  englishGameWords: string[] = [];
  readonly SEC_PER_GAME = 60;
  gameTime = 0;
  timeLeft = 0;
  isLoadingDone = false;

  wordsCount = 0;
  wordIndex = 0;
  constructor(
    private categoryservice: CategoriesService,
    private SuccessDialogService: MatDialog,
    private FailureDialogService: MatDialog,
    private PointsService: PointsService
  ) {}

  ngOnInit(): void {
    this.categoryservice
      .get(this.id!)
      .then((result) => (this.currentcategory = result));
    if (this.currentcategory) {
      const shuffledWords = [...this.currentcategory?.words].sort(
        () => Math.random() - 0.5
      );
      this.gameWords = shuffledWords.splice(0, 3);
    }

    for (let i = 0; i < this.gameWords.length; i++) {
      this.englishGameWords.push(this.gameWords[i].origin);
    }

    this.categoryservice.list().then((result) => {
      this.allCategories = result;
      if (this.allCategories.length > 0) {
        const randomCategoryIndex = Math.floor(
          Math.random() * this.allCategories.length
        );
        const randomCategory = this.allCategories[randomCategoryIndex];

        if (randomCategory) {
          const shuffledWords = [...randomCategory?.words].sort(
            () => Math.random() - 0.5
          );
          const tenpWords = shuffledWords.slice(0, 3);
          for (let i = 0; i < tenpWords.length; i++) {
            this.gameWords.push(tenpWords[i]);
          }
          this.randomCategory = randomCategory;
        }
        for (let i = 0; i < this.gameWords.length; i++) {
          this.englishGameWords.push(this.gameWords[i].origin);
          this.dataSource.push(this.gameWords[i]);
        }
        this.pointsPerWord = Math.floor(100 / this.gameWords.length);
        this.isLoadingDone = true;
      }
    });
  }

  userGuess(isPartOfCategoryGuess: boolean) {
    if (this.currentcategory && !this.endGame) {
      const rightAnswer =
        this.currentcategory.words.findIndex(
          (word: TranslatedWord) =>
            word.origin === this.gameWords[this.wordIndex].origin
        ) > -1;
      this.result.push(rightAnswer === isPartOfCategoryGuess);
      this.guess.push(isPartOfCategoryGuess);
      if (rightAnswer === isPartOfCategoryGuess) {
        const dialogRef = this.SuccessDialogService.open(
          SuccessDialogComponent
        );
        dialogRef.afterClosed().subscribe(() => this.afterDialogClose());
        this.totalPoints += this.pointsPerWord;
      } else {
        const dialogRef = this.FailureDialogService.open(
          FailureDialogComponent
        );
        dialogRef.afterClosed().subscribe(() => this.afterDialogClose());
      }
    }
  }
  afterDialogClose() {
    if (!this.endGame) {
      this.wordIndex += 1;

      if (this.wordIndex === this.gameWords.length) {
        this.endGame = true;
        this.PointsService.add(
          new GamePlayed(
            this.currentcategory?.id ?? '0',
            3,
            new Date(),
            this.totalPoints,
            0,
            0
          )
        );
      }
    }
  }
  countTrueGuess() {
    let trueGuess = 0;
    for (let i = 0; i < this.guess.length; i++) {
      if (this.guess[i]) {
        trueGuess++;
      }
    }
    console.log(trueGuess);
    return trueGuess;
  }
  progressBar() {
    console.log(this.gameWords.length);
    console.log((100 / this.gameWords.length) * this.wordIndex);
    return (100 / this.gameWords.length) * this.wordIndex;
  }

  isCurrentCategory(gameWord: string): boolean {
    if (!this.currentcategory) {
      return false;
    }
    const rightAnswer =
      this.currentcategory.words.findIndex(
        (word: TranslatedWord) => word.origin === gameWord
      ) > -1;
    return rightAnswer;
  }

  gameTimeChange(eventTime: number) {
    this.gameTime = eventTime;
    if (this.gameTime === 0) {
      this.endGame = true;
      this.PointsService.add(
        new GamePlayed(
          this.currentcategory?.id ?? '0',
          3,
          new Date(),
          this.totalPoints,
          0,
          this.SEC_PER_GAME
        )
      );
    }
  }
  
}
