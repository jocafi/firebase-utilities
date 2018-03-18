import dotenv from "dotenv";

import { FirebaseService } from "./firebase.service";
import { Config } from "./types";
import { FirebaseJsonLoader } from "./firebase-json-loader";
import { LoggingService } from "logging-service-node";

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: ".env.firebase" });

LoggingService.initializeLoggingService();
LoggingService.debug("quantity of arguments: " + process.argv.length);

if (process.argv.length < 4) {
  printSyntax();
  process.exit(0);
}

function printSyntax() {
  const errMsg = "\n\nSyntax: node app.js sourceJson collection"
    + "\n\nMandatory parameters:\n"
    + "\n  sourceFilename : \tsource json file."
    + "\n  collection : \t\tcollection name to add the records."
    + "\n\nExample:  node app.js my-collection"
    + "\n\nAttention: \n"
    + "\nDo not forget to add your firebase configuration to the file .env.firebase\n";
  LoggingService.error(errMsg);
}

const sourceFilename = process.argv[2],
  collection = process.argv[3];

const firebaseService: FirebaseService = new FirebaseService();

try {
  const config: Config = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId
  };

  firebaseService.initializeFirebaseApp(config);
} catch (error) {
  LoggingService.error("An error occurred during the firebase initialization. " +
    "\nCheck the firebase configuration file '.env.firebase' and the Internet connection. Error message: \n" + error);
}

const loader = new FirebaseJsonLoader(sourceFilename, collection, firebaseService);
const result = loader.loadJson();
if (result) {
  result.forEach((promise) => {
    promise.then(() => {
      LoggingService.info("Batch processing finished.");
    });
  });
  LoggingService.info("Process finished. Check the Firebase Console at https://console.firebase.google.com");
} else {
  LoggingService.warn("Process finished . Check the log for errors.");
}
