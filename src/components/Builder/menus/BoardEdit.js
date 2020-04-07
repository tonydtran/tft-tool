import React from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import colors from '../../../vars/colors'

const BoardEdit = (props) => {
  const { id, title, text, onHide, saveBoard, deleteBoard } = props
  const { register, handleSubmit, errors, watch } = useForm()

  const deleting = watch('deleting', false)
  //TODO: check if form is dirty to trigger prevent quit without saving
  const onSubmit = async ({ title, text, deleting }) => {
    if (deleting) {
      await deleteBoard(id)
    } else {
      saveBoard(title, text)
      onHide()
    }
  }

  return (
    <>
      <Header className="bg-secondary" closeButton>
        <Modal.Title>
          <i className="fas fa-edit mr-2" /> Board edit
        </Modal.Title>
      </Header>
      <Modal.Body className="bg-dark">
        <Form className="mt-2" noValidate onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              type="text"
              placeholder="My awesome build"
              defaultValue={title}
              isInvalid={errors.title}
              ref={register({ required: 'Required.' })}
              maxLength={70}
              disabled={deleting}
            />
            {errors.title && (
              <Form.Control.Feedback type="invalid">{errors.title.message}</Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group controlId="text">
            <Form.Label>Text</Form.Label>
            <Form.Control
              as="textarea"
              name="text"
              rows={3}
              ref={register()}
              defaultValue={text}
              isInvalid={errors.text}
              disabled={deleting}
            />
            <Form.Text></Form.Text>
          </Form.Group>
          <Form.Group controlId="deleting">
            <Delete
              type="switch"
              label="Delete board"
              name="deleting"
              ref={register()}
              defaultChecked={false}
            />
            {deleting && <Form.Text>Delete for good. No way back.</Form.Text>}
          </Form.Group>
          <Button
            className="mt-4"
            variant={deleting ? 'danger' : 'primary'}
            type="submit"
            size="lg"
            block
            disabled={Object.keys(errors).length > 0}
          >
            {deleting ? 'Delete board' : 'Ok'}
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

const Delete = styled(Form.Check)`
  input:checked ~ label {
    &:before {
      border-color: ${colors.danger} !important;
      background-color: ${colors.danger} !important;
    }
  }
`

export default BoardEdit
