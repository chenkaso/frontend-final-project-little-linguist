import {
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp,
} from '@angular/fire/firestore';
import { Category } from '../../../shared/model/category';
import { TranslatedWord } from '../../../shared/model/translated-word';

export const categoryConverter = {
  toFirestore: (category: Category) => {
    const words = [];
    for (let i = 0; i < category.words.length; ++i) {
      words.push({
        origin: category.words[i].origin,
        target: category.words[i].target,
      });
    }

    return {
      name: category.name,
      origin: category.origin,
      target: category.target,
      words: words,
      lastUpdateDatete: Timestamp.fromDate(category.lastUpdateDate),
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ) => {
    const data = snapshot.data(options);
    const words = data['words'];
    const category = new Category(
      snapshot.id,
      data['name'],
      data['origin'],
      data['target']
    );
    category.lastUpdateDate = data['lastUpdateDatete'].toDate();
    if (words) {
      for (let i = 0; i < words.length; ++i) {
        category.words.push(
          new TranslatedWord(words[i].origin, words[i].target)
        );
      }
    }
    return category;
  },
};
