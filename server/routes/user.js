
import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
dotenv.config();

const router = express.Router();

// Create user
router.route('/create').post(async (req, res) => {
  const { email, password } = req.body;
  console.log("Email: ", email);
  console.log("Password: ", password);
  const result = await fetch(
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
  );

  res.send(result);
});

export default router;
