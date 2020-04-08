import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Card from 'react-bootstrap/Card'

import { FirebaseContext } from '../Firebase'
import { withAuthorization } from '../Session'
import { StoreContext } from '../Store'
import ViewHeader from '../shared/layouts/ViewHeader'

const firebaseErrorHandler = error => {
  const isEmailRelated = error.code.includes('email')

  return {
    field: isEmailRelated ? 'email' : 'password',
    type: error.code.replace('auth/', ''),
    message: error.message
  }
}

const UpdateEmail = ({ history }) => {
  const firebase = useContext(FirebaseContext)
  const store = useContext(StoreContext)
  const [isLoading, setIsLoading] = useState(true)
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    (async () => {
      // TODO: Implement error handling
      const userData = await firebase.getCurrentUserData()

      setUserEmail(userData.val().email)
      setIsLoading(false)
    })()
  }, [firebase])

  const { register, handleSubmit, errors, setError } = useForm()

  const onSubmit = async ({ email, password }) => {
    setIsLoading(true)
    try {
      const authUser = await firebase.doSignInWithEmailAndPassword(userEmail, password)
      await firebase.doEmailUpdate(email)
      await firebase.user(authUser.user.uid).update({
        email
      })
      store.addMessage(
        'GGWP!',
        "Your email address has been updated. Don't forget to use it as your new login for your next sign in!",
        10000
      )
      history.push('/settings')
    } catch (err) {
      const { field, type, message } = firebaseErrorHandler(err)
      setError(field, type, message)
      setIsLoading(false)
    }
  }

  return (
    <>
      <ViewHeader>
        <div className="mt-2 mb-2">
          <Link to="/settings">
            <i className="fas fa-chevron-left fa-sm" /> Settings
        </Link>
        </div>
        <h1>Update email</h1>
      </ViewHeader>
      <Card bg="dark">
        <Card.Body>
          <Form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="email">
              <Form.Label>New email address</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder={userEmail}
                isInvalid={errors.email}
                ref={register({ required: 'Required.' })}
              />
              {errors.email && (
                <Form.Control.Feedback type="invalid">{errors.email.message}</Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                isInvalid={errors.password}
                ref={register({ required: 'Required' })}
              />
              {errors.password && (
                <Form.Control.Feedback type="invalid">{errors.password.message}</Form.Control.Feedback>
              )}
              <Form.Text>Enter your password to update your email address</Form.Text>
            </Form.Group>
            <Button
              className="mt-4"
              variant="primary"
              type="submit"
              block
              disabled={Object.keys(errors).length > 0 || isLoading}
            >
              {
                isLoading
                  ? <Spinner className="ml-2" as="span" animation="border" variant="light" size="sm" />
                  : 'Update my email address'
              }
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  )
}

const condition = ({ authUser }) => !!authUser

export default withAuthorization(condition)(UpdateEmail)
