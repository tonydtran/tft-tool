import React from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import routes from './Router'
import { withAuthentication } from './Session'

import NavBar from './layouts/NavBar'
import View from './layouts/View'
import Toasts from './layouts/Toasts'

const App = () => {
  return (
    <Router>
      <NavBar />
      <View>
        <Switch>
          {
            routes.map(route => (
              <Route key={route.path} {...route} />
            ))
          }
          <Redirect to="/notfound" />
        </Switch>
      </View>
      <Toasts />
    </Router>
  )
}

export default withAuthentication(App)
