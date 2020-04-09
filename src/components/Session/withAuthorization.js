/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { FirebaseContext } from '../Firebase'

import Loading from '../layouts/Loading'

const withAuthorization = condition => Component => props => {
  const firebase = useContext(FirebaseContext)
  const history = useHistory()

  const [isLoading, setIsloading] = useState(true)
  const [currentUser, setCurrentUser] = useState(true)

  useEffect(() => {
    const listener = firebase.auth.onAuthStateChanged(async authUser => {
      if (!authUser) {
        history.push('/')
      } else {
        const userData = await firebase.getCurrentUserData()
        const listenedCurrentUser = { authUser, userData: userData.val() }
        setCurrentUser(listenedCurrentUser)
        setIsloading(false)
      }
    })

    return () => listener()
  }, [])

  if (isLoading) return <Loading />

  if (condition(currentUser)) return <Component {...props} />

  return null
}

export default withAuthorization
