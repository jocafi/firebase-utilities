"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const tsutil_1 = require("tsutil");
const logging_service_node_1 = require("logging-service-node");
class FirebaseJsonLoader {
    /**
     * Constructor.
     * @param {string} collection collection name.
     * @param {string} filename json source filename.
     * @param {FirebaseService} firebaseService firebase service.
     */
    constructor(sourceFilename, collection, firebaseService) {
        this.log = logging_service_node_1.LoggingService.getLogger(FirebaseJsonLoader.name);
        this.sourceFilename = sourceFilename;
        this.collection = collection;
        this.firebaseService = firebaseService;
        this.log.debug("FirebaseJsonLoader initialized.");
    }
    validateSyntax() {
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
    loadJson() {
        if (!this.validateSyntax()) {
            return null;
        }
        this.log.debug("Reading file {} ...", this.sourceFilename);
        const jsonData = tsutil_1.readFile(this.sourceFilename);
        this.log.debug("Converting to json ...");
        const objects = JSON.parse(jsonData);
        this.log.debug("objects quantity: " + objects.length);
        return this.firebaseService.batch(this.collection, objects);
    }
}
exports.FirebaseJsonLoader = FirebaseJsonLoader;
//# sourceMappingURL=firebase-json-loader.js.map