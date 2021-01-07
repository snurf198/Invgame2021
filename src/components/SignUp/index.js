import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as assets from '../../constants/money';
const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  certificationRight: '',
  certificationInput: '',
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit1 = event => {
    const { username, email, passwordOne } = this.state;
    console.log("sign in!!",this);
    this.props.firebase
    .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
            asset: assets.INITIAL_ASSET,
            reward: 0,
          });
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        console.log("hi");
        this.props.history.push(ROUTES.EMAIL_HAS_BEEN_SENT);
        console.log("hihi");
        let user = this.props.firebase.auth.currentUser;
        console.log("sisisissi");
        console.log("user",user);
        user.sendEmailVerification().then(function() {
        }).catch(function(error) {
          console.log(error);
        });
        window.location.href = ROUTES.EMAIL_HAS_BEEN_SENT;
      })
      .catch(error => {
        this.setState({ error });
      });
      
    event.preventDefault();
  };
  
  onSubmit2 = event => {
    
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      certificationRight,
      certificationInput,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';
    const isInvalid2 =
      certificationInput !== certificationRight ||
      certificationRight === '';

    return (
      <div>
      <form onSubmit={this.onSubmit1}>
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <button disabled={isInvalid} type="submit">
          Send
        </button>

        {error && <p>{error.message}</p>}
      </form>
      <form onSubmit={this.onSubmit2}>
        <input
          name="certification"
          value={certificationInput}
          onChange={this.onChange}
          type="password"
          placeholder="Certification Number"
        />
        <button disabled={isInvalid2} type="submit">
          Sign Up
        </button>
      </form>
      </div>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export { SignUpForm, SignUpLink };