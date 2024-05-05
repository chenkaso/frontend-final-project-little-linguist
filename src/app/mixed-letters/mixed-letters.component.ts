import { Component, Input, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { MatDialog } from '@angular/material/dialog';
import { Category } from '../../shared/model/category';
import { TranslatedWord } from '../../shared/model/translated-word';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { FailureDialogComponent } from '../failure-dialog/failure-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-mixed-letters',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
  ],
  templateUrl: './mixed-letters.component.html',
  styleUrl: './mixed-letters.component.css',
})
export class MixedLettersComponent implements OnInit {
  @Input()
  id?: string;
  endGame = false;
  currentcategory?: Category;
  gameWords: TranslatedWord[] = [];
  hebrewGameWords: string[] = [];
  wordIndex = 0;
  englishGameWords: string[] = [];
  splitEnglish: string[] = [];
  wordLetters: string = '';
  selected?: string;
  result: boolean[] = [];
  guess: boolean[] = [];
  totalPoints = 0;
  pointsPerWord = 0;
  displayedColumns: string[] = ['origin', 'target', 'actions'];
  dataSource: TranslatedWord[] = [];
  selectedWords: string[] = [];
  showResult: boolean[] = [];
  trueGuess = 0;

  constructor(
    private categoryservice: CategoriesService,
    private SuccessDialogService: MatDialog,
    private FailureDialogService: MatDialog
  ) {}
  shuffleString(str: string): string {
    let charArray = str.split('');
    for (let i = charArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [charArray[i], charArray[j]] = [charArray[j], charArray[i]];
    }
    return charArray.join('');
  }
  ngOnInit(): void {
    this.currentcategory = this.categoryservice.get(parseInt(this.id!));
    if (this.currentcategory) {
      let shuffledWords = [...this.currentcategory?.words].sort(
        () => Math.random() - 0.5
      );
      this.gameWords = shuffledWords;
    }
    for (let i = 0; i < this.gameWords.length; i++) {
      this.hebrewGameWords.push(this.gameWords[i].target);
      this.englishGameWords.push(this.gameWords[i].origin);
    }
    this.pointsPerWord = Math.floor(100 / this.gameWords.length);

    let splitEnglish = this.englishGameWords[this.wordIndex].split('');
    console.log(splitEnglish);
    if (splitEnglish) {
      this.wordLetters = this.shuffleString(splitEnglish.join(''));
      console.log(this.wordLetters);
    }
  }

  userGuess() {
    let originlWord = this.englishGameWords[this.wordIndex];

    if (this.selected == originlWord) {
      let dialogRef = this.SuccessDialogService.open(SuccessDialogComponent);
      dialogRef.afterClosed().subscribe(() => this.afterDialogClose());
      this.totalPoints += this.pointsPerWord;
    } else {
      let dialogRef = this.FailureDialogService.open(FailureDialogComponent);
      dialogRef.afterClosed().subscribe(() => this.afterDialogClose());
    }
  }
  afterDialogClose() {
    this.wordIndex += 1;
    if (this.wordIndex == this.gameWords.length) {
      this.endGame = true;
    } else {
      let splitEnglish = this.englishGameWords[this.wordIndex].split('');
      console.log(splitEnglish);
      if (splitEnglish) {
        this.wordLetters = this.shuffleString(splitEnglish.join(''));
        console.log(this.wordLetters);
      }
      this.selected = '';
    }
  }

  reset() {
    if (this.selected) {
      this.selected = '';
    }
  }

  countTrueGuess() {
    let trueGuess = 0;
    this.showResult = [];
    for (let i = 0; i < this.englishGameWords.length; i++) {
      if (this.selected === this.englishGameWords[i]) {
        this.showResult.push(true);
        trueGuess++;
      }
    }
    console.log(trueGuess);
    return trueGuess;
  }
}
