/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react'

import AuthUserContext from './context'
import { FirebaseContext } from '../Firebase'

const withAuthentication = Component => props => {
  const firebase = useContext(FirebaseContext)
  const [authUser, setAuthUser] = useState(null)

  useEffect(() => {
    const listener = firebase.auth.onAuthStateChanged(currentAuthUser => {
      currentAuthUser ? setAuthUser(currentAuthUser) : setAuthUser(null)
    })

    return () => listener()
  }, [])

  return (
    <AuthUserContext.Provider value={authUser}>
      <Component {...props} />
    </AuthUserContext.Provider>
  )
}

export default withAuthentication
