import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { /*useRouteMatch,*/ /*useHistory*/ } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import { FirebaseContext } from '../Firebase'
import { withAuthorization } from '../Session'
import Build from '../../models/Build'
import ViewHeader from '../shared/layouts/ViewHeader'
import BuildSettings from './menus/BuildSettings'

const Builder = () => {
  // const routeMatch = useRouteMatch()
  // console.log(routeMatch)
  // TODO: Use routeMatch to fetch existing build
  // const history = useHistory()

  const firebase = useContext(FirebaseContext)

  const [settingsModal, setSettingsModal] = useState(false)
  const [build, setBuild] = useState(new Build({
    authorUid: ''
  }))

  const openModal = () => setSettingsModal(true)
  const closeModal = () => setSettingsModal(false)

  const saveBuild = update => {
    const newBuild = { ...build }

    Object.keys(update).forEach(key => {
      newBuild[key] = update[key]
    })

    setBuild(newBuild)
  }

  return (
    <>
      <ViewHeader>
        <div className="mt-2 mb-2">
          <Button variant="link" className="p-0">
            <i className="fas fa-chevron-left fa-sm" /> My builds
          </Button>
          <div className="d-flex align-items-center">
            <h1 className="d-inline-block text-truncate">New build</h1>
            <I
              className="fas fa-tools fa-lg text-success ml-2"
              onClick={openModal}
            />
          </div>
        </div>
      </ViewHeader>
      <Modal show={settingsModal} onHide={closeModal} centered>
        <BuildSettings onHide={closeModal} build={build} saveBuild={saveBuild} />
      </Modal>
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

const condition = () => true

export default withAuthorization(condition)(Builder)
