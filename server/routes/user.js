
import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
dotenv.config();

const router = express.Router();

// Create user
router.route('/create').post(async (req, res) => {
  const { email, password } = req.body;
  let errorMsg = '';
  await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.FIREBASE_API_KEY}`,
    {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    }
  ).then((res) => {
    if (res.ok) {
    } else {
      return res.json().then((data) => {
        errorMsg = 'Authentication failed!';
        if (data && data.error && data.error.message) {
          errorMsg = data.error.message;
        }
        console.log(errorMsg);

      });
    }
  });

  if (errorMsg.length > 0) {
    return res.status(401).json({ message: errorMsg });

  } else {
    return res.status(200).json({ message: 'User created!' });
  }
});

// Login user
router.route('/login').post(async (req, res) => {
  const { email, password } = req.body;
  let result = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`,
    {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    }
  );
  result = await result.json();
  console.log(result);
  return res.json(result);
});

// Change password
router.route('/change-password').post(async (req, res) => {
  const { idToken, password } = req.body;
  let result = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.FIREBASE_API_KEY}`,
    {
      method: 'POST',
      body: JSON.stringify({
        idToken: idToken,
        password: password,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    }
  );
  result = await result.json();
  console.log(result);
  return res.json(result);
});


export default router;
