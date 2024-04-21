import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
} from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { GameDifficulty } from '../../shared/model/gamedifficulty';
import { GamePlayed } from '../../shared/model/gameplayed';
import { GameProfile } from '../../shared/model/gameprofile';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-exit-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    RouterLink,
  ],
  templateUrl: './exit-dialog.component.html',
  styleUrl: './exit-dialog.component.css',
})
export class ExitDialogComponent {}
