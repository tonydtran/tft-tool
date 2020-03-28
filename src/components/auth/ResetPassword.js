import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { StoreContext } from '../Store'
import { FirebaseContext } from '../Firebase'
import Message from '../../models/Message'
// import viewports from '../../vars/viewports'

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
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, errors, setError } = useForm()

  const onSubmit = async ({ email }) => {
    setIsLoading(true)
    try {
      await firebase.doPasswordReset(email)
      store.addMessage(new Message(
        'Reset link sent!',
        "You should receive it soon in your mail box. Don't forget to check your spam box ;)"
      ))
      history.push('/signin')
    } catch (err) {
      const { field, type, message } = firebaseErrorHandler(err)
      setError(field, type, message)
      setIsLoading(false)
    }
  }

  return (
    <>
      <h1>Reset Password</h1>
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
            <Form.Text>We will send you a link to reset your password</Form.Text>
          </Form.Group>
          <Button
            className="mt-5"
            variant="primary"
            type="submit"
            size="lg"
            block
            disabled={Object.keys(errors).length > 0 || isLoading}
          >
            {isLoading ? 'Loading...' : 'Send reset link'}
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

const FormContainer = styled.div`
  padding: 1rem;
`

export default React.memo(ResetPassword)
