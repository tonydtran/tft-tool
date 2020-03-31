import React, { useState } from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Modal from 'react-bootstrap/Modal'

const BuildSettings = ({ onHide }) => {
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, errors, setError } = useForm()

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <>
      <Header className="bg-secondary" closeButton>
        <Modal.Title>
          <i className="fas fa-tools mr-2" /> Build settings
        </Modal.Title>
      </Header>
      <Modal.Body className="bg-dark">
        <Form className="mt-2" noValidate onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              type="text"
              placeholder="My awesomme build"
              isInvalid={errors.title}
              ref={register({ required: 'Required.' })}
            />
            {errors.title && (
              <Form.Control.Feedback type="invalid">{errors.title.message}</Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group controlId="isPublic">
            <Form.Check
              type="switch"
              label="Public"
              name="isPublic"
              ref={register()}
            />
            <Form.Text>Allow your build to be viewable by everyone</Form.Text>
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
                : 'Save'
            }
          </Button>
        </Form>
      </Modal.Body>
    </>
  )
}

const Header = styled(Modal.Header)`
  button {
    font-size: 2rem;
  }
`

export default BuildSettings
