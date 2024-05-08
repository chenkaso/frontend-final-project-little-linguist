import { Injectable } from '@angular/core';
import { GamePlayed } from '../../shared/model/gameplayed';

@Injectable({
  providedIn: 'root',
})
export class PointsService {
  private readonly Games_KEY = 'games';
  private getPoints(): Map<number, GamePlayed> {
    let pointsString = localStorage.getItem(this.Games_KEY);
    if (!pointsString) {
      return new Map<number, GamePlayed>();
    } else {
      return new Map<number, GamePlayed>(JSON.parse(pointsString));
    }
  }
  list(): GamePlayed[] {
    return Array.from(this.getPoints().values());
  }
  private setPoints(list: Map<number, GamePlayed>): void {
    localStorage.setItem(this.Games_KEY, JSON.stringify(Array.from(list)));
  }
  add(game: GamePlayed): void {
    let pointsMap = this.getPoints();
    pointsMap.set(game.gameId, game);
    console.log(pointsMap);
    this.setPoints(pointsMap);
  }
  getGameById(gameId: number): GamePlayed | undefined {
    return this.getPoints().get(gameId);
  }
}
