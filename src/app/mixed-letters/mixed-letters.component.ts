import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
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
    MatProgressBarModule,
    TimerComponent,
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
  readonly SEC_PER_GAME = 180;
  gameTime = 0;
  timeLeft = 0;

  constructor(
    private categoryservice: CategoriesService,
    private SuccessDialogService: MatDialog,
    private FailureDialogService: MatDialog,
    private PointsService: PointsService
  ) {}
  shuffleString(str: string): string {
    const charArray = str.split('');
    for (let i = charArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [charArray[i], charArray[j]] = [charArray[j], charArray[i]];
    }
    return charArray.join('');
  }
  ngOnInit(): void {
    this.currentcategory = this.categoryservice.get(parseInt(this.id!));
    if (this.currentcategory) {
      const shuffledWords = [...this.currentcategory?.words].sort(
        () => Math.random() - 0.5
      );
      this.gameWords = shuffledWords;
    }
    for (let i = 0; i < this.gameWords.length; i++) {
      this.hebrewGameWords.push(this.gameWords[i].target);
      this.englishGameWords.push(this.gameWords[i].origin);
    }
    this.pointsPerWord = Math.floor(100 / this.gameWords.length);

    const splitEnglish = this.englishGameWords[this.wordIndex].split('');
    console.log(splitEnglish);
    if (splitEnglish) {
      this.wordLetters = this.shuffleString(splitEnglish.join(''));
      console.log(this.wordLetters);
    }
  }

  userGuess() {
    const originlWord = this.englishGameWords[this.wordIndex];

    if (this.selected == originlWord && !this.endGame) {
      this.result.push(true);
      const dialogRef = this.SuccessDialogService.open(SuccessDialogComponent);
      dialogRef.afterClosed().subscribe(() => this.afterDialogClose());
      this.totalPoints += this.pointsPerWord;
    } else {
      this.result.push(false);
      const dialogRef = this.FailureDialogService.open(FailureDialogComponent);
      dialogRef.afterClosed().subscribe(() => this.afterDialogClose());
    }
  }
  afterDialogClose() {
    this.wordIndex += 1;
    if (this.wordIndex == this.gameWords.length) {
      this.endGame = true;
      this.PointsService.add(
        new GamePlayed(
          this.currentcategory?.id ?? 0,
          4,
          new Date(),
          this.totalPoints,
          0,
          0
        )
      );
    } else {
      const splitEnglish = this.englishGameWords[this.wordIndex].split('');
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
      } else {
        this.showResult.push(false);
      }
    }
  
    return trueGuess;
  }

  progressBar() {
    console.log(this.gameWords.length);
    console.log((100 / this.gameWords.length) * this.wordIndex);
    return (100 / this.gameWords.length) * this.wordIndex;
  }
  gameTimeChange(eventTime: number) {
    this.gameTime = eventTime;
  }
  reportTimeLeft() {
    this.timeLeft = this.gameTime
  }
}
