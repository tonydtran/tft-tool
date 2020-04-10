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
import Viewport from '../shared/layouts/Viewport'

const firebaseErrorHandler = error => {
  const isNewPasswordRelated = error.code.includes('weak-password')

  return {
    field: isNewPasswordRelated ? 'newPassword' : 'password',
    type: error.code.replace('auth/', ''),
    message: error.message
  }
}

const UpdatePassword = ({ history }) => {
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

  const { register, handleSubmit, errors, setError, watch } = useForm()

  const onSubmit = async ({ password, newPassword }) => {
    setIsLoading(true)
    try {
      await firebase.doSignInWithEmailAndPassword(userEmail, password)
      await firebase.doPasswordUpdate(newPassword)
      store.addMessage(
        'GGWP!',
        "Your password has been updated. Don't forget to use it for your next sign in!",
        10000
      )
      history.push('/settings')
    } catch (err) {
      const { field, type, message } = firebaseErrorHandler(err)
      setError(field, type, message)
      setIsLoading(false)
    }
  }

  const watchNewPassword = watch('newPassword')

  return (
    <Viewport>
      {viewport => (
        <>
          <ViewHeader>
            <div className="mt-2 mb-2">
              <Link to="/settings">
                <i className="fas fa-chevron-left fa-sm" /> Settings
        </Link>
            </div>
            <h1>Update password</h1>
          </ViewHeader>
          <Card bg="dark">
            <Card.Body>
              <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="currentPassword">
                  <Form.Label>Current password</Form.Label>
                  <Form.Control
                    name="password"
                    type="password"
                    isInvalid={errors.password}
                    ref={register({ required: 'Required' })}
                  />
                  {errors.password && (
                    <Form.Control.Feedback type="invalid">{errors.password.message}</Form.Control.Feedback>
                  )}
                </Form.Group>
                <Form.Group controlId="newPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    name="newPassword"
                    type="password"
                    placeholder="Qwerty123 (please don't...)"
                    isInvalid={errors.newPassword}
                    ref={register({
                      required: 'Required',
                      pattern: {
                        value: new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})'),
                        message: 'Invalid password.'
                      },
                      validate: value => (!value.includes('Qwerty123') && !value.includes('Azerty123')) || 'Seriously, bro?'
                    })}
                  />
                  {errors.newPassword && (
                    <Form.Control.Feedback type="invalid">{errors.newPassword.message}</Form.Control.Feedback>
                  )}
                  <Form.Text>Must contains at least 8 characters with at least one capital letter and one digit</Form.Text>
                </Form.Group>
                <Form.Group controlId="passwordConfirm">
                  <Form.Label>Confirm password</Form.Label>
                  <Form.Control
                    name="passwordConfirm"
                    type="password"
                    isInvalid={errors.passwordConfirm}
                    ref={register({
                      required: 'Required.',
                      validate: value => value === watchNewPassword || 'Passwords do not match.'
                    })}
                  />
                  {errors.passwordConfirm && (
                    <Form.Control.Feedback type="invalid">{errors.passwordConfirm.message}</Form.Control.Feedback>
                  )}
                  <Form.Text>To make sure you won't ask for a password reset in a minute</Form.Text>
                </Form.Group>
                <div className="d-flex justify-content-center mt-5">
                  <Button
                    variant="primary"
                    type="submit"
                    block={viewport !== 'desktop'}
                    disabled={Object.keys(errors).length > 0 || isLoading}
                    style={viewport === 'desktop' ? { minWidth: '174px' } : undefined}
                  >
                    {
                      isLoading
                        ? <Spinner className="ml-2" as="span" animation="border" variant="light" size="sm" />
                        : 'Update my password'
                    }
                  </Button>
                </div>
              </Form>
              <div className="text-center mt-4">
                <Link to="/resetpassword">Forgot your password?</Link>
              </div>
            </Card.Body>
          </Card>
        </>
      )}
    </Viewport>
  )
}

const condition = currentUser => !!currentUser

export default React.memo(withAuthorization(condition)(UpdatePassword))
