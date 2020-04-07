/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { useRouteMatch, useHistory } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'
import { formatDistance } from 'date-fns'

import { FirebaseContext } from '../Firebase'
import { withOrWithoutAuthorization } from '../Session'
import { StoreContext } from '../Store'
import colors from '../../vars/colors'
import Loading from '../layouts/Loading'
import Build from '../../models/Build'
import BoardSet from '../../models/BoardSet'
import ViewHeader from '../shared/layouts/ViewHeader'
import BuildSettings from './menus/BuildSettings'
import BoardMaker from './BoardMaker'

const Builder = ({ authUser }) => {
  const routeMatch = useRouteMatch()
  const history = useHistory()
  const firebase = useContext(FirebaseContext)
  const store = useContext(StoreContext)

  const [settingsModal, setSettingsModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [build, setBuild] = useState(new Build({
    boards: [new BoardSet()]
  }))

  useEffect(() => {
    (async () => {
      const { params: { id } } = routeMatch
      // TODO: handle error
      if (id) {
        const loadedBuild = await firebase.build(id).once('value')
        if (loadedBuild.val()) {
          setBuild(loadedBuild.val())
          setIsLoading(false)
        } else {
          history.replace('/notfound')
        }
      } else {
        setIsLoading(false)
      }
    })()
  }, [])

  const toggleModal = () => setSettingsModal(!settingsModal)

  const saveBuild = async update => {
    if (authUser) {
      if (!isSaving) {
        setIsSaving(true)

        const newBuild = { ...build }

        if (update) {
          Object.keys(update).forEach(key => {
            newBuild[key] = update[key]
          })
        }

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
        if (buildExist) window.history.replaceState(null, '', `/builds/${newBuild.id}`)
        setIsSaving(false)
      }
    } else {
      alert('You must sign in/up to save this build')
      // TODO: Save the build in local storage
      // Add variable to redirect user here and auto save
    }
  }

  const deleteBuild = async () => {
    if (!isSaving) {
      setIsSaving(true)

      // TODO: implement error handler
      const checkUserBuilds = await firebase.getCurrentUserData()
      const userBuilds = checkUserBuilds.val().builds

      await firebase.build(build.id).remove()
      await firebase.user(authUser.uid).update({
        builds: userBuilds.filter(currentBuild => currentBuild !== build.id)
      })

      store.addMessage(
        'Build deleted',
        'No Guardian Angel, this build is gone for good...'
      )

      history.push('/builds')
    }
  }

  const deleteBoard = boardId => {
    const currentBoards = [...build.boards].filter(board => board.id !== boardId)

    setBuild({...build, boards: currentBoards })
  }

  const updateBoard = updatingBoard => {
    const currentBoards = [...build.boards].map(board => {
      if (board.id === updatingBoard.id) {
        return updatingBoard
      }

      return board
    })

    setBuild({ ...build, boards: currentBoards })
  }

  if (isLoading) return <Loading />

  return (
    <>
      <ViewHeader>
        <div className={authUser ? 'mt-2' : null}>
          {authUser && (
            <Button
              variant="link"
              className="p-0"
              onClick={() => history.push('/builds')}
            >
              <i className="fas fa-chevron-left fa-sm" /> My builds
            </Button>
          )}
          <div className="d-flex align-items-baseline">
            <h1 className="d-inline-block text-truncate mb-0">{build.title}</h1>
            <I
              className="fas fa-tools fa-lg text-success ml-2"
              onClick={toggleModal}
            />
          </div>
        </div>
      </ViewHeader>
      <Container className="">
        {
          build.boards && build.boards.map(board => (
            <BoardMaker
              key={board.id}
              deleteBoard={deleteBoard}
              updateBoard={updateBoard}
              {...board}
            />
          ))
        }
      </Container>
      <SaveButton onClick={() => saveBuild()}>
        { //TODO: check if builder is dirty or not to display button or reset wording
        // Merge save from modal and this button
          isSaving
            ? (<Spinner
                style={{ margin: '0.344rem 0' }}
                as="span"
                animation="border"
                variant="light"
              />)
            : (<>
                <p className="font-weight-bold mb-0">Save</p>
                <small>
                {
                  build.lastUpdate
                    ? `Last save ${formatDistance(build.lastUpdate, Date.now())} ago`
                    : 'Never saved'
                }
                </small>
              </>)
        }
      </SaveButton>
      <Modal show={settingsModal} onHide={toggleModal} centered>
        <BuildSettings
          onHide={toggleModal}
          build={build}
          saveBuild={saveBuild}
          deleteBuild={deleteBuild}
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

const Container = styled.div`
  padding: 0 1rem 1rem;
`

const SaveButton = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  bottom: 0;
  background-color: ${colors.primary};
  padding: .25rem 0;

  &:active {
    background-color: ${colors.light};
    color: ${colors.primary};
  }
`

export default withOrWithoutAuthorization(Builder)
