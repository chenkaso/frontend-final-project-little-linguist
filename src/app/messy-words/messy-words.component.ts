import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Category } from '../../shared/model/category';
import { TranslatedWord } from '../../shared/model/translated-word';
import { CategoriesService } from '../services/categories.service';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-messy-words',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
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

  readonly WORDS_PER_GAME = 3;
  gameWords: TranslatedWord[] = [];

  // לפרק זוגות
  englishGameWords: string[] = [];
  wordIndex = 0;
  constructor(private categoryservice: CategoriesService, private dialogService: MatDialog) {}
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
    this.allCategories = this.categoryservice.list();
    console.log(this.allCategories);
    if (this.allCategories.length > 0) {
      let randomCategoryIndex = Math.floor(
        Math.random() * this.allCategories.length
      );
      let randomCategory = this.allCategories[randomCategoryIndex];
      console.log(randomCategory);

      if (randomCategory) {
        
        let shuffledWords = [...randomCategory?.words].sort(
          () => Math.random() - 0.5
        );
        this.gameWords = shuffledWords.slice(0, 3);
        console.log(this.gameWords);
        this.randomCategory = randomCategory;
      }
      for (let i = 0; i < this.gameWords.length; i++) {
        this.englishGameWords.push(this.gameWords[i].origin);
      }
    }
  
      openSuccessDialog(): void {
        for(let i = 0; i <this.currentcategory?.words.length; i++){
          if(this.gameWords[this.wordIndex].origin==this.currentcategory?.words[i].origin ){
            let dialogRef = this.dialogService.open(SuccessDialogComponent);
        
    
      
    }
   }
  }
