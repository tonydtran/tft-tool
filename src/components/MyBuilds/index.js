/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Card from 'react-bootstrap/Card'

import { withAuthorization } from '../Session'
import { FirebaseContext } from '../Firebase'

import Loading from '../layouts/Loading'
import ViewHeader from '../shared/layouts/ViewHeader'
import Viewport from '../shared/layouts/Viewport'
import NewBuildButton from './NewBuildButton'
import Item from './Item'

const MyBuilds = ({ currentUser: { uid } }) => {
  const firebase = useContext(FirebaseContext)
  const history = useHistory()

  const [isLoading, setIsLoading] = useState(true)
  const [builds, setBuilds] = useState(null)

  useEffect(() => {
    (async () => {
      // TODO: Implement error handling
      const userBuilds = await firebase.builds()
        .orderByChild('authorUid')
        .equalTo(uid)
        .once('value' )

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
    <Viewport>
      {viewport => (
        <>
          <ViewHeader>
            <h1>My builds</h1>
          </ViewHeader>
          <Card bg="dark">
            {/* TODO: Add a header with date filter, search bar, etc */}
            <Card.Body>
              {builds ? <NewBuildButton /> : noBuilds}
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
      )}
    </Viewport>
  )
}

const condition = currentUser => !!currentUser

export default React.memo(withAuthorization(condition)(MyBuilds))
