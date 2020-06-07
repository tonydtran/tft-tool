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
import SideMenu from './menus/SideMenu'

const Builder = ({ authUser }) => {
  const routeMatch = useRouteMatch()
  const history = useHistory()
  const firebase = useContext(FirebaseContext)
  const store = useContext(StoreContext)
  const { state: { viewport } } = store

  const [openModals, setOpenModals] = useState({
    builderSettings: false
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [build, setBuild] = useState(new Build({
    boards: [new BoardSet()]
  }))
  const [deleteHovering, setDeleteHovering] = useState(false)
  const [deleteDragging, setDeleteDragging] = useState(false)

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

  const toggleModal = modal => {
    const currentModals = { ...openModals }

    setOpenModals({
      ...currentModals,
      [modal]: !currentModals[modal]
    })
  }

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

  const addNewBoard = () => {
    const { boards } = build

    boards.push(new BoardSet())

    setBuild({
      ...build, boards
    })
  }

  const onDeleteDragOver = event => {
    event.preventDefault()
    if (!deleteHovering) {
      setDeleteHovering(true)
    }
  }

  const onDeleteDragEnter = event => {
    event.preventDefault()
  }

  const onDeleteDragLeave = event => {
    event.preventDefault()
    if (deleteHovering) setDeleteHovering(false)
  }

  const onDeleteDrop = event => {
    const source = event.dataTransfer.getData('source') 
    
    if (source === 'board') {
      const currentBoards = [...build.boards]
      const { id, row } = JSON.parse(event.dataTransfer.getData('originData'))
      const boardId = event.dataTransfer.getData('originBoardId')
      const boardToEditIndex = currentBoards.findIndex(board => board.id === boardId)
      
      currentBoards[boardToEditIndex].board[row][id] = {
        id,
        row,
        carry: false,
        champ: {},
        items: []
      }

      setBuild({ ...build, boards: currentBoards })
    }

    setDeleteHovering(false)
  }

  if (isLoading) return <Loading />

  return (
    <>
      <Container viewport={viewport}>
        <div className={viewport === 'desktop' ? 'd-flex justify-content-center' : undefined}>
          <Main viewport={viewport}>
            <div style={{ margin: viewport !== 'desktop' ? '0 -1rem' : undefined }}>
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
                      onClick={() => toggleModal('builderSettings')}
                    />
                  </div>
                </div>
              </ViewHeader>
            </div>
            {
              build.boards && build.boards.map(board => (
                <BoardMaker
                  key={board.id}
                  deleteBoard={deleteBoard}
                  updateBoard={updateBoard}
                  openModals={openModals}
                  toggleModal={toggleModal}
                  toggleTrash={setDeleteDragging}
                  {...board}
                />
              ))
            }
            <div className="d-flex justify-content-center">
              <AddBoardButton onClick={addNewBoard}>
                <i className="fas fa-plus-circle mr-2" />
                <strong>Add a new board</strong>
              </AddBoardButton>
            </div>
          </Main>
        </div>
        {
          viewport === 'desktop' && (
            <div className="mt-3 d-flex justify-content-center">
              <Side>
                <SaveButton onClick={() => saveBuild()} viewport={viewport}>
                  { //TODO: check if builder is dirty or not to display button or reset wording
                    // Merge save from modal and this button
                    isSaving
                      ? (<Spinner
                        style={{ margin: '0.344rem 0' }}
                        as="span"
                        animation="border"
                        variant="dark"
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
                <SideMenu />
              </Side>
            </div>
          )
        }
      </Container>
      {
        !Object.values(openModals).some(modal => modal) && viewport !== 'desktop' && (
          <SaveButton onClick={() => saveBuild()}>
            { //TODO: check if builder is dirty or not to display button or reset wording
              // Merge save from modal and this button
              isSaving
                ? (<Spinner
                  style={{ margin: '0.344rem 0' }}
                  as="span"
                  animation="border"
                  variant="dark"
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
        )
      }
      {
        deleteDragging && (
          <DeleteZone
            dropppable
            onDrop={onDeleteDrop}
            onDragOver={onDeleteDragOver}
            onDragEnter={onDeleteDragEnter}
            onDragLeave={onDeleteDragLeave}
            dragHovering={deleteHovering}
            viewport={viewport}
          >
            <i
              className={viewport === 'desktop'
                ? 'fas fa-trash fa-3x'
                : 'fas fa-trash fa-2x'
              }
            />
          </DeleteZone>
        )
      }
      <Modal
        show={openModals.builderSettings}
        onHide={() => toggleModal('builderSettings')}
        centered
      >
        <BuildSettings
          onHide={() => toggleModal('builderSettings')}
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
  width: 100%;
  position: relative;
  ${({ viewport }) => {
    if (viewport === 'desktop') {
      return `
        padding: 0;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 2rem;
      `
    } else {
      return `
        display: block;
        padding: 0 1rem 2rem;
      `
    }
  }}
  ${'' /* display: ${({ viewport }) => viewport !== 'desktop'
    ? 'block'
    : 'flex'
  };
  justify-content: space-around; */}
  ${'' /* padding: ${({ viewport }) => viewport !== 'desktop'
    ? '0 1rem 2rem'
    : '0'
  }; */}
`

const Main = styled.div`
  margin: 0 auto;
  ${({ viewport }) => {
    if (viewport === 'desktop') {
      return `
        max-width: 40rem;
        max-height: 88vh;
        ${'' /* overflow-y: auto; */}
        ${'' /* padding-right: 4rem; */}
        margin: 0;
      `
    }
  }}
`

const Side = styled.div`
  position: fixed;
  max-width: 40rem;
`

const AddBoardButton = styled.div`
  box-shadow: 0 0 0 2px ${colors.primary};
  border-radius: 0.25rem;
  padding: 0.25rem 1rem;
  background-color: ${colors.secondary};
  color: ${colors.info};
  margin-bottom: 2rem;

  &:hover, &:active {
    transform: scale(1.05);
    cursor: pointer;
    transition: transform 300ms;
    background-color: ${colors.light};
    color: ${colors.primary};
    box-shadow: 0 0 0 2px ${colors.light};
  }
`

const SaveButton = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${colors.primary};
  padding: .25rem 0;
  border-radius: 0.25rem;
  margin-bottom: 2rem;
  transition: 300ms;

  ${({ viewport }) => {
    if (viewport !== 'desktop') {
      return `
        position: fixed;
        bottom: 0;
        border-radius: 0;
        margin-bottom: 0;
      `
    }
  }}

  &:hover, &:active {
    background-color: ${colors.light};
    color: ${colors.primary};
    cursor: pointer;
    ${({ viewport }) => viewport === 'desktop'
      ? 'transform: scale(1.1)'
      : undefined
    };
  }
`

const DeleteZone = styled.div`
  display: flex;
  justify-content: center;
  position: sticky;
  width: 100%;
  background-color: ${({ dragHovering }) => dragHovering
    ? colors.danger
    : colors.secondary
  };
  box-shadow: inset 0 0 1px 2px ${colors.danger};
  bottom: ${({ viewport }) => viewport === 'desktop'
    ? '2rem'
    : '0'
  };
  border-radius: ${({ viewport }) => viewport === 'desktop'
    ? '0.25rem'
    : '0'
  };
  z-index: 5;

  i {
    margin: ${({ viewport }) => viewport === 'desktop'
      ? '2rem'
      : '1rem'
    };
    color: ${({ dragHovering }) => dragHovering
      ? colors.white
      : colors.danger
    };
  }
`

export default React.memo(withOrWithoutAuthorization(Builder))
