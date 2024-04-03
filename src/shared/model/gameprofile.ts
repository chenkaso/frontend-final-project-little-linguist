import { GameDifficulty } from './gamedifficulty';

export class GameProfile {
  constructor(
    public id: number,
    public name: string,
    public gamediffculty: GameDifficulty,
    public description: string,
    public url: string
  ) {}
}
