import React, { FC } from "react";
import {
  Link,
  Route,
  BrowserRouter as Router,
  Switch,
  NavLink,
} from "react-router-dom";
import HomeView from "../sections/home/HomeView";
import AboutView from "../sections/about/AboutView";
import ExchangeView from "../sections/exchange/ExchangeView";
import AdminView from "../sections/admin/AdminView";

const Routes = () => {
  return (
    <Router>
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <Link className={"navbar-brand"} to={"/"}>
          Telemedi Zadanko
        </Link>
        <div id='navbarText'>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item'>
              <NavLink className={"nav-link"} exact to={"/"}>
                Home
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className={"nav-link"} exact to={"/about"}>
                About
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className={"nav-link"} exact to={"/exchange-rates"}>
                Exchange Rates
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className={"nav-link"} exact to={"/admin-demo"}>
                Admin Demo
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <Switch>
        <Route exact path='/' component={HomeView} />
        <Route exact path='/about' component={AboutView} />
        <Route exact path='/exchange-rates' component={ExchangeView} />
        <Route exact path='/admin-demo' component={AdminView} />
      </Switch>
    </Router>
  );
};

export default Routes;
