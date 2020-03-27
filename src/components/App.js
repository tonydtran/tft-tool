import React from 'react'

import NavBar from './layouts/NavBar'
import View from './layouts/View'
// import Builder from './Builder'
import SignUp from './auth/SignUp'

const App = () => {
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
