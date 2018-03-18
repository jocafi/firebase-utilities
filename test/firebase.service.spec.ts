import { Config } from "../src/types";
import { FirebaseService } from "../src/firebase.service";
// import {} from "jasmine";
import dotenv from "dotenv";

xdescribe("Firebase Service", () => {
  let firebaseService: FirebaseService;

  beforeAll(() => {
    // Load environment variables from .env file, where API keys and passwords are configured
    dotenv.config({ path: ".env.firebase" });
    this.firebaseService = new FirebaseService();
  });

  it("should connect to Cloud Firestore", () =>  {
    const config: Config = {
      apiKey: process.env.apiKey,
      authDomain: process.env.authDomain,
      databaseURL: process.env.databaseURL,
      projectId: process.env.projectId,
      storageBucket: process.env.storageBucket,
      messagingSenderId: process.env.messagingSenderId
    }
    firebaseService.initializeFirebaseApp(config);
    console.log("connected !");
  });
});