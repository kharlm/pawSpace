import * as firebase from 'firebase';
import ENV from '../env';
require('firebase/firestore')

const config = {
  apiKey: "AIzaSyA1AKubWzMdb3NsBfazu3-XXN8-wBwaknM",
  authDomain:  "pawspace-1151b.firebaseapp.com",
  databaseURL: "https://pawspace-1151b.firebaseio.com",
  projectId: "pawspace-1151b",
  storageBucket: "pawspace-1151b.appspot.com",
  messagingSenderId: "874615415719"
}

firebase.initializeApp(config)

const db = firebase.firestore()

//Need to add this to forgo deprecated warnings
db.settings({
  //timestampsInSnapshots: true
});

export default db;