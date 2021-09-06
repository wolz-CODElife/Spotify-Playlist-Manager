import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Index from './components/Index';
import Create from './components/Create';
import Error from './components/Error'
import MyCollections from './components/MyCollections';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" children={<Index />} />
        <Route path="/create" children={<Create />} /> 
        <Route path="/mycollections" children={<MyCollections /> } /> 
        <Route path="*" children={Error} />
      </Switch>
    </Router>
  )
}

export default App;
