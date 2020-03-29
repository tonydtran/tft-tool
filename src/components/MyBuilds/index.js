import React from 'react'

import { withAuthorization } from '../Session'

const MyBuilds = () => {
  return (
    <>
      <h1>My builds</h1>
    </>
  )
}

const condition = authUser => !!authUser

export default withAuthorization(condition)(MyBuilds)
