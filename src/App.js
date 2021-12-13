import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './componets/Navbar/index';
import Home from './page/Home';
import Mytruffle from "./page/Mytruffle";
import Breed from './page/Breed';
import Marketplace from './page/Marketplace';
import Game from './page/Game';
import Admin from "./page/Admin";
import Details from './page/Details';
import Footer from './componets/Footer';

function App() {

  return (
  <Router>
    <Navbar />
    <Switch>
      <Route path='/' exact component={Home} />
      <Route path='/mytruffle' component={Mytruffle} />
      <Route path='/breed' component={Breed} />
      <Route path='/marketplace' component={Marketplace} />
      <Route path='/game' component={Game} />
      <Route path='/admin' component={Admin} />
      <Route path="/details/:id?" component={Details} />
      <Route>404 Not Found!</Route>
    </Switch>
    <Footer/>
  </Router>
  );
}

export default App;
