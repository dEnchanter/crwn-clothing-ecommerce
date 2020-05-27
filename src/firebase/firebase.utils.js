import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyDfR_4E7kL0SeRMiaJPV5hLM-KG8HHHszo',
  authDomain: 'crwn-db-aff68.firebaseapp.com',
  databaseURL: 'https://crwn-db-aff68.firebaseio.com',
  projectId: 'crwn-db-aff68',
  storageBucket: 'crwn-db-aff68.appspot.com',
  messagingSenderId: '256410129959',
  appId: '1:256410129959:web:414d7655151640f6712002',
  measurementId: 'G-T6SPDLEY7S',
};

export const CreateUserProfileDocument = async (userAuth, additionalData) => {
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
      console.log('Error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
