import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Toast from 'react-bootstrap/Toast'

import viewports from '../../vars/viewports'
import colors from '../../vars/colors'

const Toasts = ({ messages, deleteMessage }) => {
  const onClose = id => {
    deleteMessage(id)
  }

  return (
    <Container>
      {
        messages.map(message => (
          <AutoToast key={message.id} message={message} onClose={onClose} />
        ))
      }
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0;
  padding: 1rem 1rem;
  z-index: 3;

  @media ${viewports.desktop} {
    width: unset;
    min-width: 348px;
    right: 0;
    margin: 1rem 4rem 2rem;
    padding: 0;
  }
`

const AutoToast = ({ message: { id, title, body, duration }, onClose }) => (
  <Toast
    autohide
    delay={duration}
    onClose={() => onClose(id)}
    style={{ boxShadow: `0 1px 4px 0 ${colors.gray}` }}
  >
    <Toast.Header>
      <strong className="mr-auto">
        {title}
      </strong>
    </Toast.Header>
    {body && (
      <Toast.Body>
        {body}
      </Toast.Body>
    )}
  </Toast>
)

Toasts.propTypes = {
  messages: PropTypes.array.isRequired,
  deleteMessage: PropTypes.func.isRequired
}

export default Toasts
