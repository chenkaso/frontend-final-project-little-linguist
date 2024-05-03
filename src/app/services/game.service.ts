import { Injectable } from '@angular/core';
import { GameDifficulty } from '../../shared/model/gamedifficulty';
import { GameProfile } from '../../shared/model/gameprofile';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private allGames: GameProfile[] = [
    new GameProfile(
      1,
      'Matching Game',
      GameDifficulty.easy,
      'Match The Words',
      'matching-game'
    ),
    new GameProfile(
      4,
      'Messy Words Game',
      GameDifficulty.hard,
      'Arrange The Letters Of The English Word In The Correct Order.',
      'messy-words'
    ),
    new GameProfile(
      3,
      'Mixed Letters Game',
      GameDifficulty.easy,
      'A game where for each word in the category we will present the word in Hebrew, and the letters of the word',
      'mixed-letters'),

];
  constructor() {}

  list(): GameProfile[] {
    return this.allGames;
  }
}
