import React, { useContext } from 'react'
import styled from 'styled-components'

import { StoreContext } from '../../Store'

const ViewHeader = ({ children }) => {
  const { state: { viewport } } = useContext(StoreContext)

  return (
    <Container viewport={viewport}>
      {children}
    </Container>
  )
}

const Container = styled.div`
  margin: ${({ viewport }) => viewport === 'desktop'
    ? '0 0 3rem 0'
    : '0 1rem 3rem'
  };
`

export default ViewHeader
