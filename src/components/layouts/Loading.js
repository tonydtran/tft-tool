import React from 'react'
import styled from 'styled-components'
import Spinner from 'react-bootstrap/Spinner'

const Loading = () => (
  <CenteredSpinner animation="border" variant="light" />
)

const CenteredSpinner = styled(Spinner)`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -1rem;
  margin-top: -1rem;
`

export default Loading
