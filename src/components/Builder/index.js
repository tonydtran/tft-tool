import React from 'react'
import { /*useRouteMatch,*/ useHistory } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const Builder = () => {
  // const routeMatch = useRouteMatch()
  // console.log(routeMatch)
  // TODO: Use routeMatch to fetch existing build
  const history = useHistory()


  return (
    <>
      <div className="mt-2 mb-2">
        <Button variant="link" className="p-0">
          <i className="fas fa-chevron-left fa-sm" /> My builds
        </Button>
      </div>
      <h1 className="mb-5">New build</h1>
    </>
  )
}

export default Builder
