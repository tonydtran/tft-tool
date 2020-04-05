import React from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Modal from 'react-bootstrap/Modal'

import colors from '../../../vars/colors'

const BuildSettings = ({ onHide, build, saveBuild, deleteBuild, isLoading }) => {
  const { register, handleSubmit, errors, watch } = useForm()

  const deleting = watch('deleting', false)

  const onSubmit = async ({ title, isPublic, deleting }) => {
    if (deleting) {
      await deleteBuild()
    } else {
      await saveBuild({ title, isPublic: !!isPublic })
      onHide()
    }
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
              placeholder="My awesome build"
              defaultValue={build.title}
              isInvalid={errors.title}
              ref={register({ required: 'Required.' })}
              maxLength={70}
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
              defaultChecked={build.isPublic}
              defaultValue={build.isPublic}
            />
            <Form.Text>Allow your build to be viewable by everyone</Form.Text>
          </Form.Group>
          {
            build.lastUpdate && (
              <Form.Group controlId="deleting">
                <Delete
                  type="switch"
                  label="Delete"
                  name="deleting"
                  ref={register()}
                  defaultChecked={false}
                />
                <Form.Text>Delete for good. No way back.</Form.Text>
              </Form.Group>
            )
          }
          <Button
            className="mt-4"
            variant={deleting ? 'danger' : 'primary'}
            type="submit"
            size="lg"
            block
            disabled={Object.keys(errors).length > 0 || isLoading}
          >
            {
              isLoading
                ? <Spinner as="span" animation="border" variant="light" />
                : deleting ? 'Delete' : 'Save'
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

const Delete = styled(Form.Check)`
  input:checked ~ label {
    &:before {
      border-color: ${colors.danger} !important;
      background-color: ${colors.danger} !important;
    }
  }
`

export default BuildSettings
