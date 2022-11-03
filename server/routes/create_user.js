
import express from 'express';

const router = express.Router();

router.route('/create_user').post(async (req, res) => {
  email, password = req.body.query;
  const result = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.FIREBASE_API_KEY}`,
    {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
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
