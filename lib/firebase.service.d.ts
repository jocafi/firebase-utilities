import * as firebase from "firebase";
import "firebase/firestore";
import DocumentReference = firebase.firestore.DocumentReference;
import { Config } from "./types";
import { Observable } from "rxjs";
export declare class FirebaseService {
    private log;
    private initialized;
    private database;
    private FID;
    constructor();
    /**
     * Initialize the firebase service.
     * @param {Config} config confu
     */
    initializeFirebaseApp(config: Config): void;
    /**
     * Check if the firebase service was initialized or not.
     *
     * @returns {boolean}
     */
    isInitialized(): boolean;
    /**
     * Get the firebase database.
     * @returns {firebase.firestore.Firestore}
     */
    getDatabase(): firebase.firestore.Firestore;
    /**
     * Add a new object to the collection and set automatically the returned id generated by Firebase.
     *
     * <p/>Documentation: https://firebase.google.com/docs/firestore/manage-data/add-data
     *
     * @param {string} collection name.
     * @param classInstance class instance to be added in the collection.
     * @returns {Promise<DocumentReference>} Promise.
     */
    add(collection: string, classInstance: any): Promise<DocumentReference>;
    /**
     * Update a document of the collection. If the document does not exist an error will be thrown.
     *
     * <p/>You can specify if the data, including new properties, should be merged into the existing document
     * setting the parameter mergeData to true. This is the default behavior.
     * Otherwise, its content will be overwritten with the newly provided data.
     *
     * <p/>Documentation: https://firebase.google.com/docs/firestore/manage-data/add-data
     *
     * @param {string} collection name.
     * @param classInstance class instance to be updated in the collection-
     * @param mergeData If true (default value), it does not overwrite the whole record,
     *        it only merges the new/modified fields.
     * @returns {Promise<void>} Promise.
     */
    update(collection: string, classInstance: any, mergeData?: boolean): Promise<void>;
    private validateBeforeUpdate;
    /**
     * Batch processing for new or existing objects. The method checks for an existing auto-generated ID and execute an
     * update, otherwise it executes an insert into the collection.
     *
     * <p/>It can only insert/update up to 500 records at time. Therefore it returns a list of Promises which corresponds
     * to each batch transaction executed.
     *
     * <p>An error will be thrown if the list of objects is empty or any pre-requisite is not fulfilled.
     *
     * @param {string} collection name.
     * @param {any[]} objects to be added / updated in the collection.
     * @param mergeData If true (default value), it does not overwrite the whole record,
     *        it only merges the new/modified fields.
     * @param {boolean} stopOnError Informs if the batch processing should exit the loop of document processing
     *        (default value, i.e., stopOnError = true) or if it should continue to try to save the next document
     *        (stopOnError = false).
     * @returns {Promise<DocumentReference>[]} list of Promises.
     */
    batch(collection: string, objects: any[], mergeData?: boolean, stopOnError?: boolean): Promise<void>[];
    private addOrUpdateToBatch;
    /**
     * Add or update a document of the collection.
     *
     * <p/>You can specify if the data, including new properties, should be merged into the existing document
     * setting the parameter mergeData to true. This is the default behavior.
     * Otherwise, its content will be overwritten with the newly provided data.
     *
     * <p/>Documentation: https://firebase.google.com/docs/firestore/manage-data/add-data
     *
     * @param {string} collection name.
     * @param classInstance class instance to be updated in the collection-
     * @param mergeData If true (default value), it does not overwrite the whole record,
     *        it only merges the new/modified fields.
     * @returns {Promise<DocumentReference>} Promise.
     */
    addOrUpdate(collection: string, classInstance: any, mergeData?: boolean): Promise<void>;
    /**
     * Get all the objects of a collection.
     *
     * @param {string} collection name.
     * @returns {Promise<any>} Promise that returns an array of objects
     */
    get(collection: string): Observable<Array<any>>;
    /**
     * Set a value for the firebase auto-generated id.
     * @param object object ot add/change the firebase auto-generated id.
     * @param {string} id value for the firebase auto-generated id.
     */
    setId(object: any, id: string): void;
    /**
     * Remove the firebase auto-generated id from the object.
     * @param object object to remove the id.
     * @returns {any} the object without
     */
    removeId(object: any): any;
}