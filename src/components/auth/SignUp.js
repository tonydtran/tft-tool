import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Card from 'react-bootstrap/Card'

import { FirebaseContext } from '../Firebase'
// import viewports from '../../vars/viewports'

const firebaseErrorHandler = error => {
  // TODO: Check once write/read change if errors change as well
  // This method might be not valid anymore
  return {
    field: error.code.includes('password') ? 'password' : 'email',
    type: error.code.replace('auth/', ''),
    message: error.message
  }
}

const SignUp = ({ history, location }) => {
  const firebase = useContext(FirebaseContext)
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, errors, setError, watch } = useForm()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  const onSubmit = async ({ email, password }) => {
    setIsLoading(true)
    try {
      const authUser = await firebase.doCreateUserWithEmailAndPassword(email, password)
      // TODO: Change db write/read rules before deploying
      // https://firebase.google.com/docs/database/security/quickstart#sample-rules
      await firebase.user(authUser.user.uid).set({
        email,
        role: ['user'],
        username: email.substring(0, email.indexOf('@'))
      })
      history.push('/builds')
    } catch (err) {
      setIsLoading(false)
      const { field, type, message } = firebaseErrorHandler(err)
      setError(field, type, message)
    }
  }

  const watchPassword = watch('password')

  return (
    <>
      <h1>Sign up</h1>
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
              <Form.Text>{"Don't worry, we won't spam you ;)"}</Form.Text>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Qwerty123 (please don't...)"
                isInvalid={errors.password}
                ref={register({
                  required: 'Required',
                  pattern: {
                    value: new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})'),
                    message: 'Invalid password.'
                  },
                  validate: value => (!value.includes('Qwerty123') && !value.includes('Azerty123')) || 'Seriously, bro?'
                })}
              />
              {errors.password && (
                <Form.Control.Feedback type="invalid">{errors.password.message}</Form.Control.Feedback>
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
                  validate: value => value === watchPassword || 'Passwords do not match.'
                })}
              />
              {errors.passwordConfirm && (
                <Form.Control.Feedback type="invalid">{errors.passwordConfirm.message}</Form.Control.Feedback>
              )}
              <Form.Text>To make sure you won't ask for a password reset in a minute</Form.Text>
            </Form.Group>
            <Button
              className="mt-4"
              variant="primary"
              type="submit"
              size="lg"
              block
              disabled={Object.keys(errors).length > 0 || isLoading}
            >
              {
                isLoading
                  ? <Spinner as="span" animation="border" variant="light" />
                  : 'Sign up'
              }
            </Button>
          </Form>
          <div className="text-center mt-4">
            <p className="mb-0">
              Already have an account? <Link to="/signin">Sign in here!</Link>
            </p>
          </div>
        </Card.Body>
      </Card>
    </>
  )
}

export default React.memo(SignUp)
