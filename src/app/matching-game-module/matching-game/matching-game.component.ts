import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../../../shared/model/category';
import { TranslatedWord } from '../../../shared/model/translated-word';
import { GamesDialogComponent } from '../../games-dialog/games-dialog.component';
import { CategoriesService } from '../../services/categories.service';
import { WordStatus } from '../word-status';

@Component({
  selector: 'app-matching-game',
  standalone: true,
  templateUrl: './matching-game.component.html',
  styleUrl: './matching-game.component.css',
  imports: [CommonModule, GamesDialogComponent],
})
export class MatchingGameComponent implements OnInit {
  @Input()
  id?: string;
  currentcategory?: Category;
  readonly WORDS_PER_GAME = 5;
  // חמש זוגות מילים
  gameWords: TranslatedWord[] = [];

  // לפרק זוגות
  englishGameWords: string[] = [];
  hebrewGameWords: string[] = [];

  constructor(private categoryservice: CategoriesService) {}
  ngOnInit(): void {
    this.currentcategory = this.categoryservice.get(parseInt(this.id!));

    for (let i = 0; i < this.WORDS_PER_GAME; ++i) {
      this.englishStatus[i] = WordStatus.Normal;
      this.hebrewStatus[i] = WordStatus.Normal;
    }

    if (this.currentcategory) {
      let shuffledWords = [...this.currentcategory?.words].sort(
        () => Math.random() - 0.5
      );
      this.gameWords = shuffledWords.splice(0, 5);
    }

    for (let i = 0; i < this.gameWords.length; i++) {
      this.englishGameWords.push(this.gameWords[i].origin);
      this.hebrewGameWords.push(this.gameWords[i].target);
    }

    this.englishGameWords.sort(() => Math.random() - 0.5);
    this.hebrewGameWords.sort(() => Math.random() - 0.5);
  }

  englishStatus: WordStatus[] = [];
  hebrewStatus: WordStatus[] = [];

  SelectWord(clickIndex:number) {
    let selectedIndex = this.englishStatus.findIndex(
      (status: WordStatus) => status == WordStatus.Selected
    );
    if (selectedIndex > -1) {
      this.englishStatus[selectedIndex] = WordStatus.Normal;
    }
    this.englishStatus[clickIndex] = WordStatus.Selected;
  }
}
