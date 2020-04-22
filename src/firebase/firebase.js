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
  measurementId: "G-5CYC3CD65E",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  console.log(collectionRef);

  const batch = firestore.batch();
  objectToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });
  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });
  return transformCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unSubscribe = auth.onAuthStateChanged((userAuth) => {
      unSubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
