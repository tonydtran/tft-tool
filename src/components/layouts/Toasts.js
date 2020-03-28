import React, { useContext } from 'react'
import styled from 'styled-components'
import Toast from 'react-bootstrap/Toast'

import viewports from '../../vars/viewports'
import { StoreContext } from '../Store'

const Toasts = () => {
  const store = useContext(StoreContext)

  const onClose = id => {
    store.deleteMessage(id)
  }

  return (
    <Container>
      {
        store.state.messages.map(message => (
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

  @media ${viewports.desktop} {
    width: unset;
    min-width: 348px;
    right: 0;
    margin: 1rem 4rem 2rem;
    padding: 0;
  }
`

const AutoToast = ({ message: { id, title, body }, onClose }) => (
  <Toast autohide delay={3000} onClose={() => onClose(id)}>
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

export default Toasts
