import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

import { FirebaseContext } from '../Firebase'
import { withAuthorization } from '../Session'
import ViewHeader from '../shared/layouts/ViewHeader'
import Viewport from '../shared/layouts/Viewport'

const Settings = () => {
  const firebase = useContext(FirebaseContext)
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    (async () => {
      // TODO: Implement error handling
      const userData = await firebase.getCurrentUserData()

      setUserEmail(userData.val().email)
    })()
  }, [firebase])

  return (
    <Viewport>
      {viewport => (
        <>
          <ViewHeader>
            <h1>Settings</h1>
          </ViewHeader>
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
          <div
            className={viewport !== 'desktop'
              ? 'mt-5 pl-3 pr-3'
              : 'd-flex justify-content-center mt-5'
            }
          >
            <Button
              className="d-flex align-items-baseline"
              variant="outline-danger"
              block={viewport !== 'desktop'}
              size="sm"
              onClick={firebase.doSignOut}
            >
              <i className="fas fa-sign-out-alt fa-sm fa-rotate-180 mr-2" />
              Disconnect
            </Button>
          </div>
        </>
      )}
    </Viewport>
  )
}

const condition = currentUser => !!currentUser

export default withAuthorization(condition)(Settings)
