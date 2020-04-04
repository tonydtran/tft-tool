/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { useRouteMatch/*, useHistory*/ } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import { FirebaseContext } from '../Firebase'
import { withOrWithoutAuthorization } from '../Session'
import Loading from '../layouts/Loading'
import Build from '../../models/Build'
import ViewHeader from '../shared/layouts/ViewHeader'
import BuildSettings from './menus/BuildSettings'

const Builder = ({ authUser }) => {
  const routeMatch = useRouteMatch()
  // TODO: Use routeMatch to fetch existing build
  // const history = useHistory()

  const firebase = useContext(FirebaseContext)

  const [settingsModal, setSettingsModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [build, setBuild] = useState(new Build({}))

  useEffect(() => {
    (async () => {
      const { params: { id } } = routeMatch
      // TODO: handle error
      if (id) {
        const loadedBuild = await firebase.build(id).once('value')
        setBuild(loadedBuild.val())
        setIsLoading(false)
      } else {
        setIsLoading(false)
      }
    })()
  }, [])

  const openModal = () => setSettingsModal(true)
  const closeModal = () => setSettingsModal(false)

  const saveBuild = async update => {
    if (authUser) {
      if (!isSaving) {
        setIsSaving(true)

        const newBuild = { ...build }

        Object.keys(update).forEach(key => {
          newBuild[key] = update[key]
        })

        newBuild.authorUid = authUser.uid
        newBuild.lastUpdate = Date.now()

        // TODO: implement error handler
        const checkUserBuilds = await firebase.getCurrentUserData()
        const userBuilds = checkUserBuilds.val().builds
        const checkBuildExist = await firebase.build(newBuild.id).once('value')
        const buildExist = checkBuildExist.val()

        if (buildExist) {
          await firebase.build(newBuild.id).update(newBuild)
        } else {
          await firebase.build(newBuild.id).set(newBuild)
          await firebase.user(authUser.uid).update({
            builds: userBuilds ? [...userBuilds, newBuild.id] : [newBuild.id]
          })
        }

        setBuild(newBuild)
        setIsSaving(false)
      }
    } else {
      alert('You must sign in/up to save this build')
      // TODO: Save the build in local storage
      // Add variable to redirect user here and auto save
    }
  }

  if (isLoading) return <Loading />

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
          isLoading={isSaving}
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
