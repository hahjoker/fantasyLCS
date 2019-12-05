import React from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';

import { AuthUserContext } from '../Session';

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = () => (
  <div class="nav">
    <ul class= "nav__menu">
      <li class= "nav__menu-item">
        <Link to={ROUTES.STATS}>Update Stats</Link>
      </li>
      <li class= "nav__menu-item">
        <Link to={ROUTES.HOME}>Home</Link>
      </li>
      <li class= "nav__menu-item">
        <Link to={ROUTES.ACCOUNT}>Account</Link>
      </li>
        <SignOutButton />
    </ul>
  </div>
);

const NavigationNonAuth = () => (
  <div class="nav">
    <ul class= "nav__menu">
      <li class= "nav__menu-item">
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li class= "nav__menu-item">
      <Link to={ROUTES.STATS}>Update Stats</Link>
    </li>
    <li class= "nav__menu-item">
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
  </div>
);

export default Navigation;