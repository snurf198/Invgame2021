import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import AdminPage from '../Admin';
import AdminCompany from '../Admin/AdminCompany';
import AdminRank from '../Admin/AdminRank';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';
import GamePage from '../Game';
import EmailSent from '../SignUp/emailsent';
import './index.css';
const App = (props) => {
  // window.addEventListener('beforeunload', (e)=>{
  //   e.preventDefault();
  //   var confirmationMessage = "hohoho";
  //   console.log("ihfad");
  //   e.returnValue = confirmationMessage; //Gecko + IE
  //   return confirmationMessage; 
  // })
  
  
  // console.log(user);
  
  // if (user === null) {
  //   return <div>hewiwiwiwiwi</div>
  // }
  return (
    <Router>
      <div>
        <Navigation />
        {/* <Route exact path={ROUTES.LANDING} component={LandingPage} /> */}
        <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route
          exact
          path={ROUTES.PASSWORD_FORGET}
          component={PasswordForgetPage}
        />
        {/* <Route exact path={ROUTES.HOME} component={HomePage} /> */}
        {/* <Route exact path={ROUTES.ACCOUNT} component={AccountPage} /> */}
        <Route exact path={ROUTES.ADMIN} component={AdminPage} />
        <Route exact path={ROUTES.COMPANY} component={AdminCompany} />
        <Route exact path={ROUTES.ADMINRANK} component={AdminRank} />
        <Route exact path={ROUTES.GAME} component={GamePage} />
        <Route exact path={ROUTES.EMAIL_HAS_BEEN_SENT} component={EmailSent} />
        {/* <footer><div class ="copyrightFooter"> N13-1, KAIST 291 DAEHAK-RO, YUSEONG-GU, DAEJEON, KOREA<br></br>
Copyright @ 2021 ICISTS Div. Tech & Design</div></footer>  */}
      </div>
    </Router>
  );
}

export default withAuthentication(App);