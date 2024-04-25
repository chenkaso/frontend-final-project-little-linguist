import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ExitDialogComponent } from '../exit-dialog/exit-dialog.component';

@Component({
  selector: 'app-exit',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './exit.component.html',
  styleUrl: './exit.component.css',
})
export class ExitComponent {
  constructor(private dialogService: MatDialog) {}

  openExitDialog(): void {
      let dialogRef = this.dialogService.open(ExitDialogComponent);
  
    }
  }
