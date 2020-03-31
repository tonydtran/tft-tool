import React from 'react'
import styled from 'styled-components'
import { /*useRouteMatch,*/ /*useHistory*/ } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

import ViewHeader from '../shared/layouts/ViewHeader'
import BuildSettings from './menus/BuildSettings'

const Builder = () => {
  // const routeMatch = useRouteMatch()
  // console.log(routeMatch)
  // TODO: Use routeMatch to fetch existing build
  // const history = useHistory()


  return (
    <>
      <ViewHeader>
        <div className="mt-2 mb-2">
          <Button variant="link" className="p-0">
            <i className="fas fa-chevron-left fa-sm" /> My builds
          </Button>
          <div className="d-flex align-items-center">
            <h1 className="d-inline-block text-truncate">New build</h1>
            <I className="fas fa-cog fa-lg text-success ml-2" />
          </div>
        </div>
      </ViewHeader>
      <BuildSettings />
    </>
  )
}

const I = styled.i`
  &:hover, &:active {
    transform: scale(1.3);
    cursor: pointer;
    transition: transform 300ms;
  }
`

export default Builder
