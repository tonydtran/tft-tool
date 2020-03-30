import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'

import viewports from '../../vars/viewports'

const View = ({ children }) => {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  return (
    <Container>
      {children}
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  display: block;
  padding: 1rem 1rem 2rem;
  min-height: calc(100vh - 70.375px);

  @media ${viewports.desktop} {
    padding: 1rem 4rem 2rem;
  }
`

export default View
