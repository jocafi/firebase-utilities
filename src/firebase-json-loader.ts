import * as fs from "fs";
import { FirebaseService } from "./firebase.service";
import { readFile } from "tsutil";
import { Logger } from "log4js";
import { FirebaseLoader } from "./types";
import { LoggingService } from "logging-service-node";

export class FirebaseJsonLoader implements FirebaseLoader {

  private log: Logger = LoggingService.getLogger(FirebaseJsonLoader.name);

  private sourceFilename: string;
  private collection: string;
  private firebaseService: FirebaseService;

  /**
   * Constructor.
   * @param {string} collection collection name.
   * @param {string} filename json source filename.
   * @param {FirebaseService} firebaseService firebase service.
   */
  constructor(sourceFilename: string, collection: string, firebaseService: FirebaseService) {
    this.sourceFilename = sourceFilename;
    this.collection = collection;
    this.firebaseService = firebaseService;
    this.log.debug("FirebaseJsonLoader initialized.");
  }

  private validateSyntax(): boolean {
    if (!this.sourceFilename) {
      this.log.error("Please, enter json source filename and target filename.");
      return false;
    }

    if (!fs.existsSync(this.sourceFilename)) {
      this.log.error("The file '{}' does not exist.", this.sourceFilename);
      return false;
    }

    return true;
  }

  /**
   * Load a json file into the firebase collection.
   *
   * <p/>It does not guarantee that the data was saved. It returns a list of promises or null if the validation fails.
   *
   * @returns {Promise<DocumentReference>[]} list of Promises.
   */
  loadJson(): Promise<void>[] {
    if (!this.validateSyntax()) {
      return null;
    }

    this.log.debug("Reading file {} ...", this.sourceFilename);
    const jsonData = readFile(this.sourceFilename);
    this.log.debug("Converting to json ...");
    const objects = JSON.parse(jsonData);
    this.log.debug("objects quantity: " + objects.length);
    return this.firebaseService.batch(this.collection, objects);
  }
}