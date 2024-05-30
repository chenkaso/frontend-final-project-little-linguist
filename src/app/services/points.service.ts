import { Injectable } from '@angular/core';
import {
  DocumentSnapshot,
  Firestore,
  QuerySnapshot,
  addDoc,
  collection,
  getDocs,
} from '@angular/fire/firestore';
import { GamePlayed } from '../../shared/model/gameplayed';
import { pointsConverter } from './converters/points-converter';

@Injectable({
  providedIn: 'root',
})
export class PointsService {
  constructor(private firestoreService: Firestore) {}

  private readonly Games_KEY = 'games';

  private getPoints(): GamePlayed[] {
    const pointsString = localStorage.getItem(this.Games_KEY);
    if (!pointsString) {
      return [];
    } else {
      return JSON.parse(pointsString);
    }
  }
  async list(): Promise<GamePlayed[]> {
    const collectionConnection = collection(
      this.firestoreService,
      'gamePlayed'
    ).withConverter(pointsConverter);
    const querySnapshot: QuerySnapshot<GamePlayed> = await getDocs(
      collectionConnection
    );
    const result: GamePlayed[] = [];
    querySnapshot.docs.forEach((docSnap: DocumentSnapshot<GamePlayed>) => {
      const data = docSnap.data();
      if (data) {
        result.push(data);
      }
    });
    return result;
  }
  private setPoints(list: GamePlayed[]): void {
    localStorage.setItem(this.Games_KEY, JSON.stringify(Array.from(list)));
  }
  async add(game: GamePlayed) {
    await addDoc(
      collection(this.firestoreService, 'gamePlayed').withConverter(
        pointsConverter
      ),
      game
    );
  }
}
