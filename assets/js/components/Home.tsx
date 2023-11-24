import React from "react";
import { Route, Redirect, Switch, Link } from "react-router-dom";
import SetupCheck from "./SetupCheck";

const Home = () => {
  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <Link className={"navbar-brand"} to={"/"}>
          Telemedi Zadanko
        </Link>
        <div id='navbarText'>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item'>
              <Link className={"nav-link"} to={"/"}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link className={"nav-link"} to={"/about"}>
                About
              </Link>
            </li>
            <li className='nav-item'>
              <Link className={"nav-link"} to={"/exchange-rates"}>
                Exchange Rates
              </Link>
            </li>
            <li className='nav-item'>
              <Link className={"nav-link"} to={"/admin-demo"}>
                Admin Demo
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <Switch>
        <Route path='/' component={SetupCheck} />
        <Route path='/about' component={SetupCheck} />
        <Route path='/exchange-rates' component={SetupCheck} />
        <Route path='/admin-demo' component={SetupCheck} />
      </Switch>
    </div>
  );
};

export default Home;
