/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react'

import { FirebaseContext } from '../Firebase'

import Loading from '../layouts/Loading'

const withOrWithoutAuthorization = Component => props => {
  const firebase = useContext(FirebaseContext)

  const [authUser, setAuthUser] = useState(null)
  const [isLoading, setIsloading] = useState(true)

  useEffect(() => {
    const listener = firebase.auth.onAuthStateChanged(async authUser => {
      setAuthUser(authUser)
      setIsloading(false)
    })

    return () => listener()
  }, [])

  if (isLoading) return <Loading />

  return <Component {...props} authUser={authUser} />
}

export default withOrWithoutAuthorization
