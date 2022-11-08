import { useState, useRef, useContext } from 'react';
import classes from './AuthForm.module.css';
import axios from 'axios';
import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router-dom'

const AuthForm = () => {
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // Add front-end validation here
    setIsLoading(true);
    if (isLogin) {
      const userObject = {
        email: enteredEmail,
        password: enteredPassword
      };
      const response = await axios.post(
        'http://localhost:4000/users/login', userObject
      );
      console.log(response);
      if (response.data.error) {
        alert("Either your email or password was incorrect.");
      }

      if (response.data.idToken) {
        authCtx.login(response.data.idToken);
        history.replace('/');
      }

      setIsLoading(false);
    } else {
      console.log(enteredEmail, enteredPassword);
      const userObject = {
        email: enteredEmail,
        password: enteredPassword
      };
      await axios.post('http://localhost:4000/users/create', userObject)
      .then((res) => {
        setIsLoading(false);
      }).catch((error) => {
        setIsLoading(false);
        if (error.response) {
          alert(error.response.data.message);
        }
      });
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef} />
        </div>
        <div className={classes.actions}>
          {!isLoading &&<button>{isLogin ? 'Login' : 'Create Account'}</button> }
          {isLoading && <p>Sending Request...</p> }
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
