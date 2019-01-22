import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { HOME_URL } from '~/routes/routes'
import Page from '~/components/Page'
import Home from '~/routes/home/containers/Home'

const AppRoutes = () => (
  <Page>
    <Switch>
      <Route exact path={HOME_URL} component={Home} />
    </Switch>
  </Page>
)

export default AppRoutes