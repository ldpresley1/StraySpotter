//START FIREBASE STUFF
import firebase from '@firebase/app';
import firestore from '@firebase/firestore';
import { ref, getDownloadURL, putBytes, getStorage } from "firebase/storage";
import storage from '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBvxF2PzJFjhiJUQxzSyt67oEQBRo56fUA",
  authDomain: "stray-spotter.firebaseapp.com",
  databaseURL: "https://stray-spotter.firebaseio.com/",
  projectId: "stray-spotter",
  storageBucket: "gs://stray-spotter.appspot.com"
};

const app = firebase.initializeApp(firebaseConfig);
const database = firebase.firestore();

export default DatabaseObject = {
	firebase:firebase,
	firestore:firestore,
  storage: storage,
	app:app,
	database:database
}