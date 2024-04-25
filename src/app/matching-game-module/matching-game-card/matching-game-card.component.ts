import { Component } from '@angular/core';
import { WordStatus } from '../word-status';
import { Category } from '../../../shared/model/category';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatchingGameComponent } from '../matching-game/matching-game.component';

@Component({
  selector: 'app-matching-game-card',
  standalone: true,
  imports: [CommonModule,MatCardModule],
  templateUrl: './matching-game-card.component.html',
  styleUrl: './matching-game-card.component.css'
})
export class MatchingGameCardComponent {
englishStatus : WordStatus[] = [];
hebrewStatus : WordStatus[] = [];
currentCategory?: Category
for (let i = 0, i<this.WORDS_PER_GAME, ++i) {
 this.englishStatus[i] = WordStatus.Normal;
 this.hebrewStatus[i] = WordStatus.Normal;
} 

private previousSelectionIndex(selection: WordStatus[]) {
  for (let i=0; i < selection.length; ++i) {
  if (selection[i] == WordStatus.Selected) {
  return i;
  }
  }
  return -1;
 }
 private previousSelectionIndex(selection: WordStatus[]) {
  return selection.findIndex(
  (status: WordStatus) => status == WordStatus.Selected);
 }
 
}
