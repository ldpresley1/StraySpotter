//START FIREBASE STUFF
import firebase from '@firebase/app';
import firestore from '@firebase/firestore';
import { ref, getDownloadURL, putBytes, getStorage } from "firebase/storage";
import storage from '@firebase/firestore';
import auth from '@firebase/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBvxF2PzJFjhiJUQxzSyt67oEQBRo56fUA",
  authDomain: "stray-spotter.firebaseapp.com",
  databaseURL: "https://stray-spotter.firebaseio.com/",
  projectId: "stray-spotter",
  storageBucket: "gs://stray-spotter.appspot.com"
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
  storage: storage,
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
        if (doc.data().flag == false)
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
        if (doc.data().flag == false)
      		DATA.push({...doc.data(),id:doc.id});
      });
      //console.log(querySnapshot);
      this.strayListByDistance = DATA;
  },
}

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (e) {
    // saving error
  }
}

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key)
    if(value !== null) {
      // value previously stored
    }
    return value
  } catch(e) {
    // error reading value
  }
}