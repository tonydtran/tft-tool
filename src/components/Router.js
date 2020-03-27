import SignUp from './auth/SignUp'
import SignIn from './auth/SignIn'
import NotFound from './layouts/NotFound'

export default [
  { path: '/signup', component: SignUp, exact: true, strict: true },
  { path: '/signin', component: SignIn, exact: true, strict: true },
  { path: '/notfound', component: NotFound, exact: true, strict: true },
]
