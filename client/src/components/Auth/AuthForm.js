import { useState, useRef } from 'react';
import classes from './AuthForm.module.css';
import axios from 'axios';

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(false);
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
      console.log(enteredEmail, enteredPassword);
      // await axios.post(`http://www.localhost:4000/users/create`, {
      //   email: enteredEmail,
      //   password: enteredPassword,
      // });
      const userObject = {
        email: enteredEmail,
        password: enteredPassword
    };
      let result = await axios.post('http://localhost:4000/users/create', userObject)
      .then((res) => {
          console.log(res.data);
      }).catch((error) => {
          if (error.response) {
              alert(error.response.data.message);
          }
      });

      // if (result.error) {
      //   alert(result.message);
      // }

      /*         axios.post('http://localhost:4000/users/create', userObject)
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            }); */
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
