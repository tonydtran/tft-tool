import React from 'react'

import { withAuthorization } from '../Session'

const Settings = () => {
  return (
    <>
      <h1>My Account</h1>
    </>
  )
}

const condition = authUser => !!authUser

export default withAuthorization(condition)(Settings)
