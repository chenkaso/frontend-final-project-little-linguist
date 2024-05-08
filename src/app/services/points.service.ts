import { Injectable } from '@angular/core';
import { GamePlayed } from '../../shared/model/gameplayed';


@Injectable({
  providedIn: 'root'
})
export class PointsService {
  private readonly Games_KEY = 'games';
  private getPoints() : GamePlayed[]{
    let pointsString = localStorage.getItem(this.Games_KEY);
    if (!pointsString) {
      return [];
    } else {
      return (JSON.parse(pointsString));
    }
  }
  list() : GamePlayed[] {
    return Array.from(this.getPoints().values());
  }
  private setPoints(list : GamePlayed[]) : void {
    localStorage.setItem(this.Games_KEY, JSON.stringify(Array.from(list)));
  }
  add(game : GamePlayed) : void {
    let pointsList = this.getPoints();
    pointsList.push(game);

    this.setPoints(pointsList);
    }
}
