/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react'
// import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import Card from 'react-bootstrap/Card'

import Loading from '../layouts/Loading'
import ViewHeader from '../shared/layouts/ViewHeader'
import NewBuildButton from './NewBuildButton'
import Item from './Item'

import { withAuthorization } from '../Session'
import { FirebaseContext } from '../Firebase'

const MyBuilds = () => {
  const firebase = useContext(FirebaseContext)
  const history = useHistory()

  const [isLoading, setIsLoading] = useState(true)
  const [builds, setBuilds] = useState(null)

  useEffect(() => {
    (async () => {
      // TODO: Implement error handling
      const userUid = await firebase.getCurrentUserUid()
      const userBuilds = await firebase.builds()
        .orderByChild('authorUid')
        .equalTo(userUid)
        .ref.once('value')

      if (userBuilds.val()) {
        const sortedBuilds = Object.values(userBuilds.val()).sort((a, b) => b.lastUpdate - a.lastUpdate)

        setBuilds(sortedBuilds)
      }

      setIsLoading(false)
    })()
  }, [])

  const goTo = buildId => {
    history.push(`/builds/${buildId}`)
  }

  const noBuilds = (
    <>
      <p className="lead mb-4">No build found. Let's create one!</p>
      <NewBuildButton large />
    </>
  )

  if (isLoading) return <Loading />

  return (
    <>
      <ViewHeader>
        <h1 className="mb-5">My builds</h1>
      </ViewHeader>
      <Card bg="dark" className="pb-3">
        {/* TODO: Add a header with date filter */}
        <Card.Body>
          {builds ? <NewBuildButton /> : noBuilds }
          {
            builds && builds.map(build => (
              <Item
                key={build.id}
                {...build}
                onClick={goTo}
              />
            ))
          }
        </Card.Body>
      </Card>
    </>
  )
}

const condition = ({ authUser }) => !!authUser

export default withAuthorization(condition)(MyBuilds)
