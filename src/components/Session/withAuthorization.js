/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import AuthUserContext from './context'
import { FirebaseContext } from '../Firebase'

const withAuthorization = condition => Component => props => {
  const firebase = useContext(FirebaseContext)
  const authUser = useContext(AuthUserContext)
  const history = useHistory()

  useEffect(() => {
    const listener = firebase.auth.onAuthStateChanged(async authUser => {
      if (!condition(authUser)) history.push('/signin')
    })

    return () => listener()
  }, [])

  if (authUser) return <Component {...props} />

  return null
}

export default withAuthorization
