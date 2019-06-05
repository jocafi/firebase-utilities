import { FirebaseService } from "./firebase.service";
import { FirebaseLoader } from "./types";
export declare class FirebaseJsonLoader implements FirebaseLoader {
    private log;
    private sourceFilename;
    private collection;
    private firebaseService;
    /**
     * Constructor.
     * @param {string} collection collection name.
     * @param {string} filename json source filename.
     * @param {FirebaseService} firebaseService firebase service.
     */
    constructor(sourceFilename: string, collection: string, firebaseService: FirebaseService);
    private validateSyntax;
    /**
     * Load a json file into the firebase collection.
     *
     * <p/>It does not guarantee that the data was saved. It returns a list of promises or null if the validation fails.
     *
     * @returns {Promise<DocumentReference>[]} list of Promises.
     */
    loadJson(): Promise<void>[];
}
