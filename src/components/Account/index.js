import React, { useState, useEffect, useContext } from 'react'
// import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
// import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

import { FirebaseContext } from '../Firebase'
import { withAuthorization } from '../Session'

const Settings = () => {
  const firebase = useContext(FirebaseContext)
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    (async () => {
      const userData = await firebase.getUserData(firebase.auth.currentUser.uid)

      setUserEmail(userData.val().email)
    })()
  }, [firebase])

  return (
    <>
      <h1 className="mb-5">Settings</h1>
      <Card bg="dark">
        <Card.Header>
          <h4 className="mb-0">My account</h4>
        </Card.Header>
        <Card.Body>
          <div className="mb-4">
            <div className="d-flex justify-content-between mb-2">
              <p className="font-weight-bold mb-0">Email address</p>
              <Link to="/settings/update_email">
                <i className="fas fa-pencil-alt fa-sm" /> Edit
              </Link>
            </div>
            <p>
              {
                userEmail
                  ? userEmail
                  : <Spinner as="span" animation="border" variant="light" size="sm" />
              }
            </p>
          </div>
          <div className="">
            <div className="d-flex justify-content-between mb-2">
              <p className="font-weight-bold mb-0">Password</p>
              <Link to="/settings/update_password">
                <i className="fas fa-pencil-alt fa-sm" /> Edit
              </Link>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  )
}

const condition = authUser => !!authUser

export default withAuthorization(condition)(Settings)
