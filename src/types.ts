// -----------------------------------------------------------------------------
//
//  Project: FIREBASE UTILITIES
//  Author: Joao Araujo (jocafi)
//   Date : 16.03.2018
//
//  This file contains all types of definitions that are used among the modules
//  or exported in the declaration file (src/index.ts). This strategy is used by MS.
//  See: https://github.com/Microsoft/TypeScript/blob/master/src/compiler/types.ts
//
// -----------------------------------------------------------------------------

// see https://firebase.google.com/docs/web/setup
export interface Config {
  apiKey: string;
  authDomain?: string;
  databaseURL?: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
}

export interface FirebaseLoader {
  loadJson(): any;
}