import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'little-linguist-f0386',
        appId: '1:472437273588:web:18a7f4100f9daaad067fa1',
        storageBucket: 'little-linguist-f0386.appspot.com',
        apiKey: 'AIzaSyCCLeZ44sUU0EHlg8x5G7OAxsWY24_oHnA',
        authDomain: 'little-linguist-f0386.firebaseapp.com',
        messagingSenderId: '472437273588',
      })
    ),
    provideFirestore(() => getFirestore()),
  ],
};
