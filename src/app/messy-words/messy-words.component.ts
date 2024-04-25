import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../../shared/model/category';
import { TranslatedWord } from '../../shared/model/translated-word';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-messy-words',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './messy-words.component.html',
  styleUrl: './messy-words.component.css',
})
export class MessyWordsComponent implements OnInit {
  @Input()
  id?: string;
  currentcategory?: Category;

  readonly WORDS_PER_GAME = 3;
  gameWords: TranslatedWord[] = [];

  // לפרק זוגות
  englishGameWords: string[] = [];
  wordIndex = 0;
  constructor(private categoryservice: CategoriesService) {}
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
    //להביא את הקטגוריות מהסרביס
    // בוחרת קטגוריה רנדומלית וממנה בוחרת 3 מילים
    this.englishGameWords.sort(() => Math.random() - 0.5);
  }

}
