import { FirebaseService } from "../src/firebase.service";
import { Config } from "../src/types";
import dotenv from "dotenv";
// import {} from "jasmine";
// const jasmine = require("jasmine");

describe("E2E Test for FirebaseService", ()=> {
  let firebaseService: FirebaseService;
  let myData: any = {};

  beforeAll(()=> {
    dotenv.config({ path: "e2e/.env.firebase-e2etest" });

    this.firebaseService = new FirebaseService();

      let config: Config = {
        apiKey: process.env.apiKey,
        authDomain: process.env.authDomain,
        databaseURL: process.env.databaseURL,
        projectId: process.env.projectId,
        storageBucket: process.env.storageBucket,
        messagingSenderId: process.env.messagingSenderId
      }

      firebaseService.initializeFirebaseApp(config);
  })

  beforeEach(() => {
    myData = {
      id: 998,
      address: "Rua da Praia nr. 18",
      city: "Salvador-Bahia",
      country: "Brazil"
    };
  })

  it("should add a document", ()=> {
    let colecao = "colTest9";
    let promise = firebaseService.add(colecao, myData)
      .then((doc) => {
        console.log("id (new): " + myData.id);
        console.log("local (new): " + myData.local);
        // console.log("id (new): " + myData._id);
        myData.local = "new Local";
        firebaseService.update(colecao, myData)
          .then(() => {
            console.log("id (update): " + myData.id);
            console.log("local (update): " + myData.local);
            console.log(myData);
          });

      })
      .catch((reason) => {
        console.error(("Reason of error: " + reason));
      });
  })
})