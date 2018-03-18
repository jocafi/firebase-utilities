"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const firebase_service_1 = require("./firebase.service");
const firebase_json_loader_1 = require("./firebase-json-loader");
const logging_service_node_1 = require("logging-service-node");
// Load environment variables from .env file, where API keys and passwords are configured
dotenv_1.default.config({ path: ".env.firebase" });
logging_service_node_1.LoggingService.initializeLoggingService();
logging_service_node_1.LoggingService.debug("quantity of arguments: " + process.argv.length);
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
    logging_service_node_1.LoggingService.error(errMsg);
}
const sourceFilename = process.argv[2], collection = process.argv[3];
const firebaseService = new firebase_service_1.FirebaseService();
try {
    const config = {
        apiKey: process.env.apiKey,
        authDomain: process.env.authDomain,
        databaseURL: process.env.databaseURL,
        projectId: process.env.projectId,
        storageBucket: process.env.storageBucket,
        messagingSenderId: process.env.messagingSenderId
    };
    firebaseService.initializeFirebaseApp(config);
}
catch (error) {
    logging_service_node_1.LoggingService.error("An error occurred during the firebase initialization. " +
        "\nCheck the firebase configuration file '.env.firebase' and the Internet connection. Error message: \n" + error);
}
const loader = new firebase_json_loader_1.FirebaseJsonLoader(sourceFilename, collection, firebaseService);
const result = loader.loadJson();
if (result) {
    result.forEach((promise) => {
        promise.then(() => {
            logging_service_node_1.LoggingService.info("Batch processing finished.");
        });
    });
    logging_service_node_1.LoggingService.info("Process finished. Check the Firebase Console at https://console.firebase.google.com");
}
else {
    logging_service_node_1.LoggingService.warn("Process finished . Check the log for errors.");
}
//# sourceMappingURL=app.js.map