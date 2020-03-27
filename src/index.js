import React from 'react'
import ReactDOM from 'react-dom'
import 'drag-drop-touch'

import Firebase, { FirebaseContext } from './components/Firebase'
import App from './components/App'

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root')
)
