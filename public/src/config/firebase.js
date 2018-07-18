import firebase from 'firebase/app';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyB3ErIYmHwVtp0VVm8bjresd5R60vOV5ag',
  authDomain: 'pratos-limpos-dev.firebaseapp.com',
  databaseURL: 'https://pratos-limpos-dev.firebaseio.com',
  projectId: 'pratos-limpos-dev',
  storageBucket: 'pratos-limpos-dev.appspot.com',
  messagingSenderId: '408827268063',
};

firebase.initializeApp(config);

export const database = firebase.database();
