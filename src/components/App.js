import React, { useContext, Suspense } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import routes from './Router'
import { withAuthentication } from './Session'
import { StoreContext } from './Store'

import ErrorBoundary from './layouts/ErrorBoundary'
import Loading from './layouts/Loading'
import NavBar from './layouts/NavBar'
import View from './layouts/View'
import Toasts from './layouts/Toasts'

const App = () => {
  const { state: { messages }, deleteMessage } = useContext(StoreContext)
  return (
    <Router>
      <NavBar />
      <View>
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            <Switch>
              {
                routes.map(route => (
                  <Route key={route.path} {...route} />
                ))
              }
              <Redirect to="/notfound" />
            </Switch>
          </Suspense>
        </ErrorBoundary>
      </View>
      {messages.length > 0 && <Toasts messages={messages} deleteMessage={deleteMessage} />}
    </Router>
  )
}

export default withAuthentication(App)
