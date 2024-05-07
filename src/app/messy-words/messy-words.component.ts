import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Category } from '../../shared/model/category';
import { TranslatedWord } from '../../shared/model/translated-word';
import { FailureDialogComponent } from '../failure-dialog/failure-dialog.component';
import { CategoriesService } from '../services/categories.service';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-messy-words',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatProgressBarModule,
  ],
  templateUrl: './messy-words.component.html',
  styleUrl: './messy-words.component.css',
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
  englishGameWordsNum: number[] = [];
  wordsCount = 0;
  wordIndex = 0;
  constructor(
    private categoryservice: CategoriesService,
    private SuccessDialogService: MatDialog,
    private FailureDialogService: MatDialog
  ) {}
  ngOnInit(): void {
    this.currentcategory = this.categoryservice.get(parseInt(this.id!));
    if (this.currentcategory) {
      let shuffledWords = [...this.currentcategory?.words].sort(
        () => Math.random() - 0.5
      );
      this.gameWords = shuffledWords.splice(0, 3);
    }

    for (let i = 0; i < this.gameWords.length; i++) {
      this.englishGameWords.push(this.gameWords[i].origin);
    }

    this.allCategories = this.categoryservice.list();
    if (this.allCategories.length > 0) {
      let randomCategoryIndex = Math.floor(
        Math.random() * this.allCategories.length
      );
      let randomCategory = this.allCategories[randomCategoryIndex];

      if (randomCategory) {
        let shuffledWords = [...randomCategory?.words].sort(
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
    }
    
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
        let dialogRef = this.SuccessDialogService.open(SuccessDialogComponent);
        dialogRef.afterClosed().subscribe(() => this.afterDialogClose());
        this.totalPoints += this.pointsPerWord;
      } else {
        let dialogRef = this.FailureDialogService.open(FailureDialogComponent);
        dialogRef.afterClosed().subscribe(() => this.afterDialogClose());
      }
    }
  }
  afterDialogClose() {
    if (!this.endGame) {
      this.wordIndex += 1;

      if (this.wordIndex === this.gameWords.length) {
        this.endGame = true;
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
    let wordsCount = 0;
    for (let i = 0; i < this.englishGameWords.length; i++) {
      if (this.englishGameWords[i]) {
        wordsCount++ * 100;
      }
    }
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
}
