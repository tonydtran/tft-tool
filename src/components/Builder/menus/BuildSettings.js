import React, { useState } from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Modal from 'react-bootstrap/Modal'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import colors from '../../../vars/colors'

const BuildSettings = ({ onHide, build, saveBuild, deleteBuild, isLoading }) => {
  const [boards, setBoards] = useState(build.boards || [])

  const { register, handleSubmit, errors, watch } = useForm()

  const deleting = watch('deleting', false)

  const onDragEnd = result => {
    if (!result.destination) return null

    const newBoardOrder = Array.from(boards)
    const [removed] = newBoardOrder.splice(result.source.index, 1)
    newBoardOrder.splice(result.destination.index, 0, removed)

    setBoards(newBoardOrder)
  }

  const onSubmit = async ({ title, isPublic, deleting }) => {
    // TODO: Handle errors
    if (deleting) {
      await deleteBuild()
    } else {
      await saveBuild({ title, isPublic: !!isPublic, boards })
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
              disabled={deleting}
            />
            {errors.title && (
              <Form.Control.Feedback type="invalid">
                {errors.title.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          {
            boards.length > 1 && (
              <Form.Group>
                <Form.Label>Boards order</Form.Label>
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="droppable">
                    {provided => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          backgroundColor: `${colors.white}`,
                          width: '100%',
                          color: `${colors.secondary}`,
                          fontSize: '0.9375rem',
                          fontWeight: '400',
                          lineHeight: '1.5',
                          border: '1px solid #222',
                          borderRadius: '0.25rem'
                        }}
                      >
                        {
                          boards.map((board, index) => (
                            <Draggable key={board.id} draggableId={board.id} index={index}>
                              {(provided, snapshot) => (
                                <div
                                  className="d-flex align-items-baseline justify-content-between"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={{
                                    userSelect: 'none',
                                    padding: '0.375rem 0.75rem',
                                    backgroundColor: snapshot.isDragging
                                      ? `${colors.primary}`
                                      : `${colors.white}`,
                                    color: snapshot.isDragging
                                      ? `${colors.white}`
                                      : `${colors.secondary}`,
                                    borderRadius: '0.25rem',
                                    ...provided.draggableProps.style
                                  }}
                                >
                                  <p className="d-inline-block text-truncate mb-0">
                                    {board.title}
                                  </p>
                                  <i className="fas fa-grip-lines ml-2" />
                                </div>
                              )}
                            </Draggable>
                          ))
                        }
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </Form.Group>
            )
          }
          {/* <Form.Group controlId="isPublic">
            <Form.Check
              type="switch"
              label="Public"
              name="isPublic"
              ref={register()}
              defaultChecked={build.isPublic}
              defaultValue={build.isPublic}
              disabled={deleting}
            />
            <Form.Text>Allow your build to be viewable by everyone</Form.Text>
          </Form.Group> */}
          {
            build.lastUpdate && (
              <Form.Group controlId="deleting">
                <Delete
                  type="switch"
                  label="Delete build"
                  name="deleting"
                  ref={register()}
                  defaultChecked={false}
                />
                {deleting && <Form.Text>Delete for good. No way back.</Form.Text>}
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
                : deleting ? 'Delete build' : 'Save build settings'
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
