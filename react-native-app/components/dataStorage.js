//START FIREBASE STUFF
import firebase from '@firebase/app';
import firestore from '@firebase/firestore';
import auth from '@firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBvxF2PzJFjhiJUQxzSyt67oEQBRo56fUA",
  authDomain: "stray-spotter.firebaseapp.com",
  databaseURL: "https://stray-spotter.firebaseio.com/",
  projectId: "stray-spotter",
  storageBucket: "stray-spotter.appspot.com"
};

// this prevent's firebase throwing the following error when doing the "Hot Reload":
//    "FirebaseError: Firebase: Firebase App named '[DEFAULT]' already exists (app/duplicate-app)."
let app;
if (firebase.apps.length > 0) {
  app = firebase.app();
} else {
  app = firebase.initializeApp(firebaseConfig);
}
const database = firebase.firestore();

export default DatabaseObject = {
	firebase:firebase,
	firestore:firestore,
	app:app,
	database:database
}

export const postData = {
  strayListByUID:[],
  strayListByDistance:[],
  getByUID: async function (uid) {
      let tempVar = database.collection("StraysFound");
      let DATA = [];
      snapshot = await tempVar.where('userID', '==', uid).get();
      snapshot.forEach(doc => {
        DATA.push({...doc.data(),id:doc.id});
      });
      //console.log(querySnapshot);
      this.strayListByUID = DATA;
  },
  getByDistance: async function () {
    let tempVar = database.collection("StraysFound");
      let DATA = [];
      snapshot = await tempVar.get();
      snapshot.forEach(doc => {
        DATA.push({...doc.data(),id:doc.id});
      });
      //console.log(querySnapshot);
      this.strayListByDistance = DATA;
  },
}