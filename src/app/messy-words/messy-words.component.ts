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

@Component({
  selector: 'app-messy-words',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTableModule],
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
  resultCategory: Category[] = [];
  message = '';
  trueGuess=0;

  readonly WORDS_PER_GAME = 3;
  gameWords: TranslatedWord[] = [];

  englishGameWords: string[] = [];
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
      this.resultCategory.push(this.currentcategory);
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
        this.resultCategory.push(this.randomCategory);
      }
      for (let i = 0; i < this.gameWords.length; i++) {
        this.englishGameWords.push(this.gameWords[i].origin);
      }
    }
  }
  userGuess(isPartOfCategoryGuess: boolean) {
    if (this.currentcategory) {
      const rightAnswer =
        this.currentcategory.words.findIndex(
          (word: TranslatedWord) =>
            word.origin == this.gameWords[this.wordIndex].origin
        ) > -1;
      this.result.push(rightAnswer == isPartOfCategoryGuess);
      this.guess.push(isPartOfCategoryGuess);

      if (rightAnswer == isPartOfCategoryGuess) {
        //דיאלוג הצלחה ולעלות כמות נקודות
        let dialogRef = this.SuccessDialogService.open(SuccessDialogComponent);
        dialogRef.afterClosed().subscribe(() => this.afterDialogClose());
      } else {
        let dialogRef = this.FailureDialogService.open(FailureDialogComponent);
        dialogRef.afterClosed().subscribe(() => this.afterDialogClose());
      }
    }
  }
  afterDialogClose() {
    this.wordIndex += 1;

    if (this.wordIndex == this.gameWords.length) {
      this.endGame = true;
    }
  }
  countTrueGuess() {
    for (let i = 0; i < this.guess.length; i++) {
      if (this.guess[i] == true) {
        this.trueGuess++;
      }
    }
    console.log(this.trueGuess);
  }
}
