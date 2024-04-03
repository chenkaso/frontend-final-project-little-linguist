import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { endOfWeek, isWithinInterval, startOfWeek, subWeeks } from 'date-fns';
import { Category } from '../../shared/model/category';
import { GamesDialogComponent } from '../games-dialog/games-dialog.component';

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.css',
})
export class GameCardComponent {
  @Input()
  currentCategory?: Category;
  constructor(private dialogService: MatDialog) {}

  openGame(id?: number, name?: string) {
    const dialogRef = this.dialogService.open(GamesDialogComponent, {
      data: id,
    });
  }
  wasRecentlyUpdated(): boolean {
    return this.isDateInLastWeek(
      new Date(this.currentCategory?.lastUpdateDate!)
    );
  }

  isDateInLastWeek(dateToCheck: Date): boolean {
    const startOfLastWeek = startOfWeek(subWeeks(new Date(), 0));
    const endOfLastWeek = endOfWeek(subWeeks(new Date(), 0));

    return isWithinInterval(dateToCheck, {
      start: startOfLastWeek,
      end: endOfLastWeek,
    });
  }
}
