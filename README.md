# firebase-utilities
The objective of this project is to create firebase utilities. It contains firebase services to execute CRUD operations, as well as, 
executing initial data load. It considers both firebase models **_Firebase Realtime Database_** and **_Cloud Firestore_**.

# Getting started
- Clone the repository
```
git clone https://github.com/jocafi/firebase-utilities.git <project_name>
```
- Install dependencies
```
cd <project_name>
npm install
```
- Configure your firebase in the file _src/.env.firebase_ according to the [firebase documentation](https://firebase.google.com/docs/web/setup). Example:
```properties
apiKey = AIzaSyAOdQ706Iz66UZkkddhihid933
authDomain = myproject.firebaseapp.com
databaseURL = https://myproject.firebaseio.com
projectId = myproject
storageBucket = myproject-test.appspot.com
messagingSenderId = 699179641112
```
- Load your json file to your firebase collection. Syntax:
```
node lib/app.js <json_source_filename> <collection>
```

# Importing the project as library 

In order to use this project as a library in your project, you have to import it:
```
npm install jocafi/firebase-utilities
```
You can use the classes below:
 
- **FirebaseServices**: offer methods for CRUD operations.
- **FirebaseJsonLoader**: enable load a json file into a collection.  
