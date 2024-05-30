import { GameProfile } from './gameprofile';

export class GamePlayed {
  constructor(
    public categoryId: string,
    public gameId: GameProfile['id'],
    public date: Date,
    public points: number,
    public secondsLeftInGame: number,
    public secondsPlayed: number
  ) {}
}
