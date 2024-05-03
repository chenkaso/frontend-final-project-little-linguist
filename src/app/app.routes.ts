import { Routes } from '@angular/router';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GameCardComponent } from './game-card/game-card.component';
import { GameViewComponent } from './game-view/game-view.component';
import { HelpPageComponent } from './help-page/help-page.component';
import { MatchingGameComponent } from './matching-game-module/matching-game/matching-game.component';
import { MessyWordsComponent } from './messy-words/messy-words.component';
import { MixedLettersComponent } from './mixed-letters/mixed-letters.component';

export const routes: Routes = [
  { path: 'categories-list', component: CategoriesListComponent },
  { path: 'category/:id', component: CategoryFormComponent },
  { path: 'newcategory', component: CategoryFormComponent },
  { path: 'game-view', component: GameViewComponent },
  { path: 'game-card', component: GameCardComponent },
  { path: 'matching-game/:id', component: MatchingGameComponent },
  { path: 'help-page', component: HelpPageComponent },
  { path: '', component: DashboardComponent },
  { path: 'messy-words/:id', component: MessyWordsComponent },
  { path: 'mixed-letters/:id', component: MixedLettersComponent },
];
