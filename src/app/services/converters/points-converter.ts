import {
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp,
} from '@angular/fire/firestore';
import { GamePlayed } from '../../../shared/model/gameplayed';

export const pointsConverter = {
  toFirestore: (game: GamePlayed) => {
    return {
      categoryId: game.categoryId,
      gameId: game.gameId,
      points: game.points,
      secondsLeftInGame: game.secondsLeftInGame,
      secondsPlayed: game.secondsPlayed,
      date: Timestamp.fromDate(game.date),
    };
  },

  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ) => {
    const data = snapshot.data(options);
    const game = new GamePlayed(
      data['categoryId'],
      data['gameId'],
      data['date'].toDate(),
      data['points'],
      data['secondsLeftInGame'],
      data['secondsPlayed']
    );
    return game;
  },
};
