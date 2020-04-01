/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import AuthUserContext from './context'
import { FirebaseContext } from '../Firebase'

import Loading from '../layouts/Loading'

const withAuthorization = condition => Component => props => {
  const firebase = useContext(FirebaseContext)
  const authUser = useContext(AuthUserContext)
  const history = useHistory()

  const [isLoading, setIsloading] = useState(true)

  useEffect(() => {
    const listener = firebase.auth.onAuthStateChanged(async authUser => {
      setIsloading(false)
      if (!condition(authUser)) history.push('/')
    })

    return () => listener()
  }, [])

  if (isLoading) return <Loading />

  if (authUser) return <Component {...props} />

  return null
}

export default withAuthorization
