import { useState, useRef } from 'react';
import classes from './AuthForm.module.css';
import axios from 'axios';

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  console.log("Firebase key: ", process.env.REACT_APP_FIREBASE_API_KEY);
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // Add front-end validation here

    if (isLogin) {

    } else {
      console.log(process.env.REACT_APP_FIREBASE_API_KEY);
      await axios.post(`https://www.localhost:5052/create_user?email=${enteredEmail}&password=${enteredPassword}`);
      // fetch(
      //   `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API_KEY}`,
      //   {
      //     method: 'POST',
      //     body: JSON.stringify({
      //       email: enteredEmail,
      //       password: enteredPassword,
      //       returnSecureToken: true,
      //     }),
      //     headers: {
      //       'Content-Type': 'application/json',
      //     }
      //   }
      // ).then(res => {
      //   if (res.ok) {
      //     // ...
      //   } else {
      //     res.json().then(data => {
      //       // Show an error modal
      //       console.log(data);
      //     })
      //   }
      // });
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
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
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
