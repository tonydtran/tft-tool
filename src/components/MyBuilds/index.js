/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import Card from 'react-bootstrap/Card'

import Loading from '../layouts/Loading'

import { withAuthorization } from '../Session'
import { FirebaseContext } from '../Firebase'
import ViewHeader from '../shared/layouts/ViewHeader'
import colors from '../../vars/colors'

const MyBuilds = () => {
  const firebase = useContext(FirebaseContext)

  const [userData, setUserData] = useState(null)

  useEffect(() => {
    (async () => {
      const fetchUserData = await firebase.getCurrentUserData()
      setUserData(fetchUserData.val())
    })()
  }, [])

  const noBuilds = (
    <>
      <p className="lead mb-4">No build found. Let's create one!</p>
      <NewBuild large />
    </>
  )

  if (!userData) return <Loading />

  return (
    <>
      <ViewHeader>
        <h1 className="mb-5">My builds</h1>
      </ViewHeader>
      <Card bg="dark" className="pb-3">
        {/* TODO: Add a header with date filter */}
        <Card.Body>
          {userData.builds ? <NewBuild /> : noBuilds }
        </Card.Body>
      </Card>
    </>
  )
}

const NewBuild = ({ large }) => {
  const history = useHistory()

  const onClick = () => {
    history.push('/builds/new')
  }

  const iconCn = large
    ? 'fas fa-plus-circle fa-3x text-info mb-3'
    : 'fas fa-plus-circle text-info mr-2'

  return (
    <NewBuildButton large={large} onClick={onClick}>
      <i className={iconCn} />
      <strong className="text-info">Start a new build</strong>
    </NewBuildButton>
  )
}

const NewBuildButton = styled.div`
  border: 4px solid ${colors.primary};
  border-radius: 0.25rem;
  padding: ${({ large }) => large
    ? '3rem 1rem'
    : '1rem'
  };
  display: flex;
  flex-direction: ${({ large }) => large
    ? 'column'
    : 'row'
  };
  align-items: center;
  justify-content: center;
  background-color: ${colors.secondary};

  &:hover, &:active {
    transform: scale(1.05);
    cursor: pointer;
    transition: transform 300ms;
  }
`

const condition = authUser => !!authUser

export default withAuthorization(condition)(MyBuilds)
