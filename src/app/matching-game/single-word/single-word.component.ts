import { Component, Input } from '@angular/core';
import { Category } from '../../../shared/model/category';
import { CategoriesService } from '../../services/categories.service';
import { TranslatedWord } from '../../../shared/model/translated-word';
import { WordStatus } from '../../matching-game-module/word-status';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-single-word',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './single-word.component.html',
  styleUrl: './single-word.component.css'
})
export class SingleWordComponent {
  @Input()
  singleword? : string
  @Input() status? : WordStatus


}
