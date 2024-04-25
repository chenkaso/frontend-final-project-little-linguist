import { Component, Input } from '@angular/core';
import { Category } from '../../shared/model/category';

@Component({
  selector: 'app-messy-words',
  standalone: true,
  imports: [],
  templateUrl: './messy-words.component.html',
  styleUrl: './messy-words.component.css'
})
export class MessyWordsComponent {
 @Input()
  id?: string;
  currentcategory?: Category;
}
