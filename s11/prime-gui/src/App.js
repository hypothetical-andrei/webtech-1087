import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import PersonEditor from './PersonEditor'
import CarEditor from './CarEditor'

class App extends React.Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route path='/' exact>
            <PersonEditor />
          </Route>
          <Route path='/persons/:pid' exact>
            <CarEditor />
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default App
