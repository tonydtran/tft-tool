/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { FirebaseContext } from '../Firebase'

const withOrWithoutAuthorization = Component => props => {
  const firebase = useContext(FirebaseContext)
  const history = useHistory()

  useEffect(() => {
    const listener = firebase.auth.onAuthStateChanged(async authUser => {

    })

    return () => listener()
  }, [])

  return <Component {...props} />
}

export default withOrWithoutAuthorization
