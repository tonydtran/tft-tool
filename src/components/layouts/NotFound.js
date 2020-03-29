import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'

// TODO: Remplace the history.replace to actual home page
const NotFound = ({ history }) => (
  <Jumbotron>
    <h1>Page not found</h1>
    <p>
      The content you were looking for does not exist.
    </p>
    {
      history.length >= 2
        ? (
          <Button className="p-0 mt-4" variant="link" onClick={() => history.goBack()}>
            <i className="fas fa-chevron-left fa-sm" /> Back
          </Button>
        )
        : (
          <Button className="p-0 mt-4" variant="link" onClick={() => history.replace('/signup')}>
            <i className="fas fa-chevron-left fa-sm" /> Home
          </Button>
        )
    }
  </Jumbotron>
)

export default NotFound
