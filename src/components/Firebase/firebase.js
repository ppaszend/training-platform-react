import app from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDgc0l48uVUJhoj8Nb8dhkWcRGx1rwIlSE",
  authDomain: "training-platform-f7ea9.firebaseapp.com",
  databaseURL: "https://training-platform-f7ea9.firebaseio.com",
  projectId: "training-platform-f7ea9",
  storageBucket: "training-platform-f7ea9.appspot.com",
  messagingSenderId: "329218426783",
  appId: "1:329218426783:web:60f4cb90b1fcbc63545faa",
  measurementId: "G-T9YTW6JM03"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);
}

export default Firebase;