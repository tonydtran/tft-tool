// NOTE: Prepare for code splitting
// import React from 'react'
// const MyComponent = React.lazy(() => import('...'))

import Home from './Home'
import SignUp from './auth/SignUp'
import SignIn from './auth/SignIn'
import ResetPassword from './auth/ResetPassword'
import NotFound from './layouts/NotFound'
import Settings from './Account'
import UpdateEmail from './Account/UpdateEmail'
import UpdatePassword from './Account/UpdatePassword'

export default [
  { path: '/signup', component: SignUp, exact: true, strict: true },
  { path: '/signin', component: SignIn, exact: true, strict: true },
  { path: '/resetpassword', component: ResetPassword, exact: true, strict: true },
  { path: '/notfound', component: NotFound, exact: true, strict: true },
  { path: '/settings', component: Settings, exact: true, strict: true },
  { path: '/settings/update_email', component: UpdateEmail, exact: true, strict: true },
  { path: '/settings/update_password', component: UpdatePassword, exact: true, strict: true },
  { path: '/', component: Home, exact: true, strict: true },
]
