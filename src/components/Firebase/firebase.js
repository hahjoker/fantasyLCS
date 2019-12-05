import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyBXr61IwyY2JK9zJCNDzIyzb9j7ni0DYi0",
    authDomain: "fantasyl.firebaseapp.com",
    databaseURL: "https://fantasyl.firebaseio.com",
    projectId: "fantasyl",
    storageBucket: "fantasyl.appspot.com",
    messagingSenderId: "762385066417",
    appId: "1:762385066417:web:abbf25241dd1c9e3da7590"
  };

class Firebase {
    constructor() {
      app.initializeApp(firebaseConfig);
      this.auth = app.auth();
      this.db = app.firestore();
    }
    
  //Auth stuff
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);
  doSignOut = () => this.auth.signOut();
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  onAuthUserListener = (next, fallback) =>
  this.auth.onAuthStateChanged(authUser => {
    if (authUser) {
      this.user(authUser.uid)
        .get()
        .then(snapshot => {
          const dbUser = snapshot.data();
          // default empty roles
          if (!dbUser.roles) {
            dbUser.roles = {};
          }
          // merge auth and db user
          authUser = {
            uid: authUser.uid,
            email: authUser.email,
            emailVerified: authUser.emailVerified,
            providerData: authUser.providerData,
            ...dbUser,
          };
          next(authUser);
        });
    } else {
      fallback();
    }
  });
  user = uid => this.db.doc(`users/${uid}`);
  users = () => this.db.collection('users');

}

  export default Firebase;