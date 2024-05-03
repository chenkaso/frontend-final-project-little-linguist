import { Component, Input, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { MatDialog } from '@angular/material/dialog';
import { Category } from '../../shared/model/category';
import { TranslatedWord } from '../../shared/model/translated-word';

@Component({
  selector: 'app-mixed-letters',
  standalone: true,
  imports: [],
  templateUrl: './mixed-letters.component.html',
  styleUrl: './mixed-letters.component.css',
})
export class MixedLettersComponent implements OnInit {
  @Input()
  id?: string;
  currentcategory?: Category;
  gameWords: TranslatedWord[] = [];
  hebrewGameWords: string[] = [];
  wordIndex = 0;
  englishGameWords: string[] = [];
  splitEnglish: string[] = [];
  wordLetters: string[] = [];
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
      this.gameWords = shuffledWords;
    }
    for (let i = 0; i < this.gameWords.length; i++) {
      this.hebrewGameWords.push(this.gameWords[i].target);
      this.englishGameWords.push(this.gameWords[i].origin);
    }
    let splitEnglish = this.englishGameWords[this.wordIndex].split('');
    console.log(splitEnglish);
    if (this.splitEnglish) {
      let shuffledWords = [...this.splitEnglish].sort(
        () => Math.random() - 0.5
      );
      this.wordLetters = shuffledWords;
      console.log(shuffledWords);
      console.log(this.wordLetters);
    }
  }
}
