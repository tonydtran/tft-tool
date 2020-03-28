import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { FirebaseContext } from '../Firebase'
// import viewports from '../../vars/viewports'

const firebaseErrorHandler = error => {
  const isPasswordRelated = error.code.includes('password')

  return {
    field: isPasswordRelated ? 'password' : 'email',
    type: error.code.replace('auth/', ''),
    message: error.message
  }
}

const SignIn = () => {
  const firebase = useContext(FirebaseContext)
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, errors, setError } = useForm()

  const onSubmit = async ({ email, password }) => {
    setIsLoading(true)
    try {
      await firebase.doSignInWithEmailAndPassword(email, password)
    } catch (err) {
      setIsLoading(false)
      const { field, type, message } = firebaseErrorHandler(err)
      setError(field, type, message)
    }
  }

  return (
    <>
      <h1>Sign In</h1>
      <FormContainer>
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
            { errors.password && (
              <Form.Control.Feedback type="invalid">{errors.password.message}</Form.Control.Feedback>
            )}
          </Form.Group>
          <Button
            className="mt-5"
            variant="primary"
            type="submit"
            size="lg"
            block
            disabled={Object.keys(errors).length > 0 || isLoading}
          >
            { isLoading ? 'Loading...' : 'Sign in' }
          </Button>
        </Form>
      </FormContainer>
      <div className="text-center mt-2">
        <Link to="/resetpassword">Forgot your password?</Link>
        <p className="mt-4">
          Don't have an account? <Link to="/signup">Sign up here!</Link>
        </p>
      </div>
    </>
  )
}

const FormContainer = styled.div`
  padding: 1rem;
`

export default React.memo(SignIn)
