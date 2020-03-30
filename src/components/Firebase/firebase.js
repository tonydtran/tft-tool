import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
}

class Firebase {
  constructor() {
    app.initializeApp(config)

    this.auth = app.auth()
    this.db = app.database()
  }

  // Auth API
  doCreateUserWithEmailAndPassword = (email, password) => {
    return this.auth.createUserWithEmailAndPassword(email, password)
  }

  doSignInWithEmailAndPassword = (email, password) => {
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  doSignOut = () => this.auth.signOut()

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email)

  doPasswordUpdate = password => {
    return this.auth.currentUser.updatePassword(password)
  }

  doEmailUpdate = email => {
    return this.auth.currentUser.updateEmail(email)
  }

  // Database API
  //- Users API
  user = uid => this.db.ref(`users/${uid}`)

  getUserData = uid => this.db.ref(`/users/${uid}`).once('value')

  users = () => this.db.ref('users')
}

export default Firebase
