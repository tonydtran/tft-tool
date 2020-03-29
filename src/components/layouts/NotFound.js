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
    <Button className="p-0 mt-4" variant="link" onClick={() => history.goBack()}>
      <i className="fas fa-chevron-left fa-sm" /> Back
    </Button>
  </Jumbotron>
)

// const Container = styled.div`

// `

export default NotFound
