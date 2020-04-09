import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Card from 'react-bootstrap/Card'

import { StoreContext } from '../Store'
import { FirebaseContext } from '../Firebase'
import ViewHeader from '../shared/layouts/ViewHeader'

const firebaseErrorHandler = error => {
  const isPasswordRelated = error.code.includes('password')

  return {
    field: isPasswordRelated ? 'password' : 'email',
    type: error.code.replace('auth/', ''),
    message: error.message
  }
}

const SignIn = ({ history }) => {
  const firebase = useContext(FirebaseContext)
  const { state: { viewport } } = useContext(StoreContext)
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, errors, setError } = useForm()

  const onSubmit = async ({ email, password }) => {
    setIsLoading(true)
    try {
      await firebase.doSignInWithEmailAndPassword(email, password)
      history.push('/builds')
    } catch (err) {
      setIsLoading(false)
      const { field, type, message } = firebaseErrorHandler(err)
      setError(field, type, message)
    }
  }

  return (
    <>
      <ViewHeader>
        <h1>Sign in</h1>
      </ViewHeader>
      <Container bg="dark" viewport={viewport}>
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
            </Form.Group>
            <div className="d-flex justify-content-center mt-5">
              <Button
                variant="primary"
                type="submit"
                size="lg"
                block={viewport !== 'desktop'}
                disabled={Object.keys(errors).length > 0 || isLoading}
              >
                {
                  isLoading
                    ? <Spinner as="span" animation="border" variant="light" />
                    : 'Sign in'
                }
              </Button>
            </div>
          </Form>
          <div className="text-center mt-4">
            <Link to="/resetpassword">Forgot your password?</Link>
            <p className="mt-4 mb-0">
              Don't have an account? <Link to="/signup">Sign up here!</Link>
            </p>
          </div>
        </Card.Body>
      </Container>
    </>
  )
}

const Container = styled(Card)`
  ${({ viewport }) => viewport === 'desktop'
    ? 'max-width: 40rem; margin: auto'
    : undefined
  }
`

export default React.memo(SignIn)
