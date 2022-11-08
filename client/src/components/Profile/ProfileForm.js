import classes from './ProfileForm.module.css';
import { useRef, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router-dom'

const ProfileForm = () => {
  const history = useHistory();
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredNewPassword = newPasswordInputRef.current.value;
    const userObject = {
      idToken: authCtx.token,
      password: enteredNewPassword
    };
    const response = await axios.post(
      'http://localhost:4000/users/change-password', userObject
    );
    console.log(response);

    if (response.data.error) {
      alert('Failed to update password');
    } else {
      history.replace('/');
    }
  }

  return (
    <form className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button onClick={submitHandler}>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
