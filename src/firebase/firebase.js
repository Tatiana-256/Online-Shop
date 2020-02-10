import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyD-BjMmazo_ZjUl5UqWgOuK9Or1yROST9o",
  authDomain: "online-shop-ef95b.firebaseapp.com",
  databaseURL: "https://online-shop-ef95b.firebaseio.com",
  projectId: "online-shop-ef95b",
  storageBucket: "online-shop-ef95b.appspot.com",
  messagingSenderId: "861561148718",
  appId: "1:861561148718:web:3584d7cb15db8fc87bd6bf",
  measurementId: "G-5CYC3CD65E"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
