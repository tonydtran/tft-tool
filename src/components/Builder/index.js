/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { /*useRouteMatch,*/ /*useHistory*/ } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import { FirebaseContext } from '../Firebase'
import { withOrWithoutAuthorization } from '../Session'
import Build from '../../models/Build'
import ViewHeader from '../shared/layouts/ViewHeader'
import BuildSettings from './menus/BuildSettings'

const Builder = ({ authUser }) => {
  // const routeMatch = useRouteMatch()
  // console.log(routeMatch)
  // TODO: Use routeMatch to fetch existing build
  // const history = useHistory()

  const firebase = useContext(FirebaseContext)

  const [settingsModal, setSettingsModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [build, setBuild] = useState(new Build({}))

  const openModal = () => setSettingsModal(true)
  const closeModal = () => setSettingsModal(false)

  const saveBuild = async update => {
    if (authUser) {
      if (!isLoading) {
        setIsLoading(true)

        const newBuild = { ...build }

        Object.keys(update).forEach(key => {
          newBuild[key] = update[key]
        })

        newBuild.authorUid = authUser.uid
        newBuild.lastUpdate = Date.now()

        // TODO: implement error handler
        await firebase.build(newBuild.id).set(newBuild)

        setBuild(newBuild)
        setIsLoading(false)
      }
    } else {
      alert('You must sign in/up to save this build')
      // TODO: Save the build in local storage
      // Add variable to redirect user here and auto save
    }
  }

  return (
    <>
      <ViewHeader>
        <div className="mt-2 mb-2">
          <Button variant="link" className="p-0">
            <i className="fas fa-chevron-left fa-sm" /> My builds
          </Button>
          <div className="d-flex align-items-center">
            <h1 className="d-inline-block text-truncate">{build.title}</h1>
            <I
              className="fas fa-tools fa-lg text-success ml-2"
              onClick={openModal}
            />
          </div>
        </div>
      </ViewHeader>
      <Modal show={settingsModal} onHide={closeModal} centered>
        <BuildSettings
          onHide={closeModal}
          build={build}
          saveBuild={saveBuild}
          isLoading={isLoading}
        />
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

export default withOrWithoutAuthorization(Builder)
