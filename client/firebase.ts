import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  signInWithCredential,
} from 'firebase/auth';

//import {...} from "firebase/auth";
export const auth = getAuth();
// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyAwqgekxDTSKucX84v9DVJcdMyGunawtRY',
  authDomain: 'favor-appp<.firebaseapp.com',
  databaseURL: 'https://favor-appp<.firebaseio.com',
  projectId: 'favor-appp<',
  storageBucket: 'favor-appp<.appspot.com',
  messagingSenderId: '767065730345',
  appId: '1:767065730345:ios:4d88ff306ea69051b3db38',
};

initializeApp(firebaseConfig);
