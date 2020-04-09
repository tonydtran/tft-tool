import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Card from 'react-bootstrap/Card'

import { StoreContext } from '../Store'
import { FirebaseContext } from '../Firebase'
import { AuthUserContext } from '../Session'
import ViewHeader from '../shared/layouts/ViewHeader'
import Viewport from '../shared/layouts/Viewport'

const firebaseErrorHandler = error => {
  // TODO: Check once write/read change if errors change as well
  // This method might be not valid anymore
  return {
    field: 'email',
    type: error.code.replace('auth/', ''),
    message: error.message
  }
}

const ResetPassword = ({ history }) => {
  const firebase = useContext(FirebaseContext)
  const store = useContext(StoreContext)
  const authUser = useContext(AuthUserContext)
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, errors, setError } = useForm()

  const onSubmit = async ({ email }) => {
    setIsLoading(true)
    try {
      await firebase.doPasswordReset(email)
      store.addMessage(
        'Reset link sent!',
        "You should receive it soon in your mail box. Don't forget to check your spam box ;)"
      )
      history.push('/signin')
    } catch (err) {
      const { field, type, message } = firebaseErrorHandler(err)
      setError(field, type, message)
      setIsLoading(false)
    }
  }

  return (
    <Viewport>
      {viewport => (
        <>
          <ViewHeader>
            {
              authUser && (
                <div className="mt-2 mb-2">
                  <Link to="/settings/update_password">
                    <i className="fas fa-chevron-left fa-sm" /> Update password
              </Link>
                </div>
              )
            }
            <h1>Reset password</h1>
          </ViewHeader>
          <Card bg="dark">
            <Card.Body>
              <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    name="email"
                    type="email"
                    placeholder="typical.yasuo@rito.com"
                    isInvalid={errors.email}
                    ref={register({ required: 'Required.' })}
                  />
                  {errors.email && (
                    <Form.Control.Feedback type="invalid">{errors.email.message}</Form.Control.Feedback>
                  )}
                  <Form.Text>We will send you a link to reset your password</Form.Text>
                </Form.Group>
                <div className="d-flex justify-content-center mt-5">
                  <Button
                    variant="primary"
                    type="submit"
                    size="lg"
                    block={viewport !== 'desktop'}
                    disabled={Object.keys(errors).length > 0 || isLoading}
                    style={viewport === 'desktop' ? { minWidth: '162px' } : undefined}
                  >
                    {
                      isLoading
                        ? <Spinner as="span" animation="border" variant="light" />
                        : 'Send reset link'
                    }
                  </Button>
                </div>
              </Form>
              {
                !authUser && (
                  <div className="text-center mt-4">
                    <p className="mb-0">
                      Don't have an account? <Link to="/signup">Sign up here!</Link>
                    </p>
                  </div>
                )
              }
            </Card.Body>
          </Card>
        </>
      )}
    </Viewport>
  )
}

export default React.memo(ResetPassword)
