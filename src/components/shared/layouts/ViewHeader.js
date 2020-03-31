import React from 'react'
import styled from 'styled-components'

// import viewports from 'src/vars/viewports'
// TODO: Use viewport to adapt padding

const ViewHeader = ({ children }) => (
  <Container>
    {children}
  </Container>
)

const Container = styled.div`
  margin: 0 1rem 3rem;
`

export default ViewHeader
