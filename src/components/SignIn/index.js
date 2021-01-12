import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignInPage = () => (
  <div>
    <h1>SignIn</h1>
    <SignInForm />
    <PasswordForgetLink />
    <SignUpLink />
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  cert: false,
  error: null,
};

class SignInFormBase extends Component {
  constructor(props){
    super(props);

    this.state = { ...INITIAL_STATE };
  }
  async getLoggedIn(user){
    const snapshot = await this.props.firebase.db.ref(`/users/${user.uid}/loggedin`).once('value');
    console.log(user);
    console.log("help..",snapshot);
    const loggedin = snapshot.val();
    console.log("loglog",loggedin);
    return loggedin;     
  }
  async getLoggedinUser(){
    const snapshot = await this.props.firebase.db.ref('/loggedinUser').once('value');
    return snapshot.val();
  }
  onSubmit = event => {
    const { email, password } = this.state;
    this.props.firebase
    .doSignInWithEmailAndPassword(email, password)
    .then((user) => {
      if(user.user.emailVerified){
        this.getLoggedIn(user.user).then((res) => {
          if(res===false){
            console.log("this",this);
            this.setState({...INITIAL_STATE});
            if(user.user.email==="icists@icists.org"){
              this.props.history.push(ROUTES.ADMIN);
            }
            else{
              var updates = {};
              console.log("hey");
              this.getLoggedinUser().then(
                (logus) => {
                  updates[`/loggedinUser/`] = logus + 1;
              updates[`/users/${user.user.uid}/loggedin`] = true;
              this.props.firebase.db.ref().update(updates);
              this.props.history.push(ROUTES.HOME);
                }
              );
            }
          }
          else{
            alert("이미 로그인함");
          }
        });
       
      }
      else if(user != null){
        this.props.firebase.auth.signOut();
        alert("verify your email");
      }
    
    })
    .catch(error => {
      this.setState({ error });
    });
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === '' || email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
        name="email"
        value={email}
        onChange={this.onChange}
        type="text"
        placeholder="Email Address"
        />
        <input
        name="password"
        value={password}
        onChange={this.onChange}
        type="password"
        placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>

        {error && <p>{error.message}</p>}
      </form>

    );
  }

}
const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInPage;

export { SignInForm };
