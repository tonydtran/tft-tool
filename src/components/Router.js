import SignUp from './auth/SignUp'
import SignIn from './auth/SignIn'
import ResetPassword from './auth/ResetPassword'
import NotFound from './layouts/NotFound'
import Settings from './Account'
import ChangeEmail from './Account/ChangeEmail'

export default [
  { path: '/signup', component: SignUp, exact: true, strict: true },
  { path: '/signin', component: SignIn, exact: true, strict: true },
  { path: '/resetpassword', component: ResetPassword, exact: true, strict: true },
  { path: '/notfound', component: NotFound, exact: true, strict: true },
  { path: '/settings', component: Settings, exact: true, strict: true },
  { path: '/settings/change_email', component: ChangeEmail, exact: true, strict: true },
]
