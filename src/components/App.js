import React, { useContext } from 'react'

import { FirebaseContext } from './Firebase'
import NavBar from './layouts/NavBar'
import View from './layouts/View'
// import Builder from './Builder'
import SignUp from './auth/SignUp'

const App = () => {
  const firebaseContext = useContext(FirebaseContext)
  console.log(firebaseContext)
  return (
    <>
      <NavBar />
      <View>
        {/* <Builder /> */}
        <SignUp />
      </View>
    </>
  )
}

export default App
