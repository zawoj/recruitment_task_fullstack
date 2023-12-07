import React, { FC, useState } from "react";
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
import EchangeHistoryView from "../sections/exchange/EchangeHistoryView";
import ContactView from "../sections/contanct/ContactView";
import CalculatorView from "../sections/calculator/CalculatorView";

const Routes = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  
  return (
    <Router>
      <nav className='navbar navbar-expand-lg navbar-dark bg-success-custom mb-4'>
        <Link className="navbar-brand" to="/">
          Telemedi ATM
        </Link>

        <button className="navbar-toggler" type="button" onClick={toggle}>
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={"collapse navbar-collapse" + (isOpen ? " show" : "")} id="navbarText">
          <ul className='navbar-nav ml-auto'>
            <li className='nav-item'>
              <NavLink className="nav-link" exact to="/">
                Home
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className="nav-link" exact to="/about">
                About
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className="nav-link" exact to="/exchange-rates">
                Exchange Rates
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className="nav-link" exact to="/contact">
                Contact
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className="nav-link" exact to="/calculator">
                Calculator
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <Switch>
        <Route exact path='/' component={HomeView} />
        <Route exact path='/about' component={AboutView} />
        <Route exact path='/exchange-rates' component={ExchangeView} />
        <Route exact path='/contact' component={ContactView} />
        <Route path={'/rate-history'} component={EchangeHistoryView} />
        <Route path={'/calculator'} component={CalculatorView} />
      </Switch>
    </Router>
  );
};

export default Routes;
