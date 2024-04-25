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

//להגדיר אינפוט מסוג סטטוס
//להגדיר מילה
//להציג מילה בתוך קארד
//לשנות צבע
//לשלב את הקארד בתוך המשחק
}
