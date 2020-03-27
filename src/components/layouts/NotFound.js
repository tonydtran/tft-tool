import React from 'react'
// import styled from 'styled-components'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'

const NotFound = ({ history }) => (
  <Jumbotron>
    <h1>Page not found</h1>
    <p>
      The content you were looking for does not exist.
      </p>
    <Button variant="link" onClick={() => history.goBack()}>
      Back
      </Button>
  </Jumbotron>
)

// const Container = styled.div`

// `

export default NotFound
