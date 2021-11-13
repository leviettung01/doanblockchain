import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './componets/Navbar/index';
import Home from './componets/Factory/Home';
import Marketplace from './componets/Factory/Marketplace';
import Breed from './componets/Factory/Breed';
import Details from './componets/Factory/Details';
import Footer from './componets/Footer';

function App() {

  return (
  <Router>
    <Navbar />
    <Switch>
      <Route path='/' exact component={Home} />
      <Route path='/breed' component={Breed} />
      <Route path='/marketplace' component={Marketplace} />
      <Route path="/details/:id?" component={Details} />
      <Route>404 Not Found!</Route>
    </Switch>
    <Footer/>
  </Router>
  );
}

export default App;
