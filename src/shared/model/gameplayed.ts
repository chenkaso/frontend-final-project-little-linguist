import {GameProfile } from './gameprofile';

export class GamePlayed{
  constructor(
    public categoryId: number,
    public gameId:  GameProfile["id"],
    public date: Date,
    public points: number
  ){}
}