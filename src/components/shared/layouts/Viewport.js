import React, { useContext } from 'react'
import styled from 'styled-components'

import { StoreContext } from '../../Store'

const Viewport = ({ children }) => {
  const { state: { viewport } } = useContext(StoreContext)
  const childrenType = typeof children

  return (
    <Container viewport={viewport}>
      {childrenType === 'function' ? children(viewport) : children}
    </Container>
  )
}

const Container = styled.div`
  ${({ viewport }) => viewport === 'desktop'
    ? 'max-width: 40rem; margin: auto'
    : undefined
  }
`

export default Viewport
