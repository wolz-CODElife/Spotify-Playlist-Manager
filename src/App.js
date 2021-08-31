import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Index from './components/Index';
import Create from './components/Create';
import Error from './components/Error'




const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" children={<Index />} />
        <Route exact path="/create" children={<Create />} /> 
        <Route path="*"><Error /> </Route>       
      </Switch>
    </Router>
  )
}

export default App;
