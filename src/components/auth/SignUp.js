import React, { useContext } from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { FirebaseContext } from '../Firebase'
// import viewports from '../../vars/viewports'

const SignUp = () => {
  const firebase = useContext(FirebaseContext)
  const { register, handleSubmit, errors, watch } = useForm()

  const onSubmit = data => {
    console.log(data)
    // firebase.doCreateUserWithEmailAndPassword()
  }

  const watchPassword = watch('password')

  return (
    <>
      <h1>Sign Up</h1>
      <FormContainer>
        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="typical.yasuo@rito.com"
              isInvalid={errors.email}
              ref={register({ required: 'Required' })} // TODO: Add async check if existing game
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
                  message: 'Invalid password'
                },
                validate: value => (!value.includes('Qwerty123') && !value.includes('Azerty123')) || 'Seriously, bro?'
              })}
            />
            { errors.password && (
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
                required: 'Required',
                validate: value => value === watchPassword || 'Passwords do not match'
              })}
            />
            {errors.passwordConfirm && (
              <Form.Control.Feedback type="invalid">{errors.passwordConfirm.message}</Form.Control.Feedback>
            )}
            <Form.Text>To make sure you won't ask for a password reset in a minute</Form.Text>
          </Form.Group>
          <Button
            className="mt-5"
            variant="primary"
            type="submit"
            size="lg"
            block
            disabled={Object.keys(errors).length > 0}
          >
            Submit
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

const FormContainer = styled.div`
  padding: 1rem;
`

export default React.memo(SignUp)
