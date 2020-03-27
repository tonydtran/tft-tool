import React from 'react'

import NavBar from './Layout/NavBar'
import View from './Layout/View'
import Builder from './Builder'

const App = () => {
  return (
    <>
      <NavBar />
      <View>
        <Builder />
      </View>
    </>
  )
}

export default App
