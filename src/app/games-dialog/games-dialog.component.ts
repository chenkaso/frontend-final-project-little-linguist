import { CommonModule } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA,  MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { GameProfile } from '../../shared/model/gameprofile';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-games-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    RouterLink,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    CommonModule,
  ],
  templateUrl: './games-dialog.component.html',
  styleUrl: './games-dialog.component.css',
})
export class GamesDialogComponent implements OnInit {
  selected?: GameProfile;

  @Input() name?: string;
  constructor(
    private gameService: GameService,
    @Inject(MAT_DIALOG_DATA) public id: number,
  ) {}
  games: GameProfile[] = [];

  ngOnInit(): void {
    this.games = this.gameService.list();
  }

 
}


