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
