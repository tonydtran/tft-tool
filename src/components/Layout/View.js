import React from 'react'
import styled from 'styled-components'

import viewports from '../../vars/viewports'

const View = ({ children }) => {
  return (
    <Container>
      {children}
    </Container>
  )
}

const Container = styled.div`
  display: block;
  padding: 2rem 1rem;

  @media ${viewports.desktop} {
    padding: 2rem 4rem;
  }
`

export default View
