import { Injectable } from '@angular/core';
import {
  DocumentSnapshot,
  Firestore,
  QuerySnapshot,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from '@angular/fire/firestore';
import { Category } from '../../shared/model/category';
import { categoryConverter } from './converters/categories-converter';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private firestoreService: Firestore) {}

  async list(): Promise<Category[]> {
    const collectionConnection = collection(
      this.firestoreService,
      'categories'
    ).withConverter(categoryConverter);

    const querySnapshot: QuerySnapshot<Category> = await getDocs(
      collectionConnection
    );

    const result: Category[] = [];

    querySnapshot.docs.forEach((docSnap: DocumentSnapshot<Category>) => {
      const data = docSnap.data();
      if (data) {
        result.push(data);
      }
    });
    return result;
  }

  async get(id: string): Promise<Category | undefined> {
    const categoryDocRef = doc(
      this.firestoreService,
      'categories',
      id
    ).withConverter(categoryConverter);
    return (await getDoc(categoryDocRef)).data();
  }

  async delete(id: string) {
    const categoryDocRef = doc(
      this.firestoreService,
      'categories',
      id
    ).withConverter(categoryConverter);
    return deleteDoc(categoryDocRef);
  }

  async update(existingCategory: Category): Promise<void> {
    existingCategory.lastUpdateDate = new Date();
    const categoryDocRef = doc(
      this.firestoreService,
      'categories',
      existingCategory.id
    ).withConverter(categoryConverter);
    return await setDoc(categoryDocRef, existingCategory);
  }

  async add(newCategoryData: Category) {
    newCategoryData.lastUpdateDate = new Date();
    await addDoc(
      collection(this.firestoreService, 'categories').withConverter(
        categoryConverter
      ),

      newCategoryData
    );
  }
}
