/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react'
// import styled from 'styled-components'
// import { useHistory } from 'react-router-dom'
import { formatDistance } from 'date-fns'
import Card from 'react-bootstrap/Card'

import Loading from '../layouts/Loading'
import ViewHeader from '../shared/layouts/ViewHeader'
import NewBuildButton from './NewBuildButton'

import { withAuthorization } from '../Session'
import { FirebaseContext } from '../Firebase'
// import colors from '../../vars/colors'

const MyBuilds = () => {
  const firebase = useContext(FirebaseContext)

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
      
      if (userBuilds.val()) setBuilds(userBuilds.val())
      setIsLoading(false)
    })()
  }, [])

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
            builds && Object.keys(builds).map(key => (
              <div key={key} className="mt-4">
                <div className="d-flex justify-content-between align-items-baseline">
                  <div className="d-flex align-items-baseline">
                    {
                      builds[key].isPublic
                        ? <i className="fas fa-lock mr-2 text-warning" />
                        : <i className="fas fa-unlock mr-2 text-info" />
                    }
                    <strong>
                      {builds[key].title}
                    </strong>
                  </div>
                  <span className="small text-muted text-nowrap">
                    {formatDistance(builds[key].lastUpdate, Date.now())}
                  </span>
                </div>
              </div>
            ))
          }
        </Card.Body>
      </Card>
    </>
  )
}

const condition = authUser => !!authUser

export default withAuthorization(condition)(MyBuilds)
