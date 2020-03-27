import React from 'react'

import NavBar from './layouts/NavBar'
import View from './layouts/View'
// import Builder from './Builder'
// import SignUp from './auth/SignUp'
import SignIn from './auth/SignIn'

const App = () => {
  return (
    <>
      <NavBar />
      <View>
        {/* <Builder /> */}
        <SignIn />
      </View>
    </>
  )
}

export default App
