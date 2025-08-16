import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// GOOGLE_CLIENT_ID=1234567890-abc123.apps.googleusercontent.com
// GOOGLE_CLIENT_SECRET=GOCSPX-xyz123secret
// GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback

const app = express();
const port = 3000;

// Step 1: Redirect user to Google login
app.get('/auth/google', (req, res) => {
  const redirect_uri = 'https://accounts.google.com/o/oauth2/v2/auth';
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    response_type: 'code',
    scope: 'openid email profile',
    access_type: 'offline',
    prompt: 'consent'
  });

  res.redirect(`${redirect_uri}?${params.toString()}`);
});

// Step 2: Handle the callback & exchange code for tokens
app.get('/auth/google/callback', async (req, res) => {
  const code = req.query.code;

  try {
    const tokenResponse = await axios.post(
      'https://oauth2.googleapis.com/token',
      new URLSearchParams({
        // code,
        // client_id: process.env.GOOGLE_CLIENT_ID,
        // client_secret: process.env.GOOGLE_CLIENT_SECRET,
        // redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        // grant_type: 'authorization_code'
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    const { access_token, id_token } = tokenResponse.data;

    // Step 3: Fetch user info
    const userResponse = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo`, {
      headers: { Authorization: `Bearer ${access_token}` }
    });

    const user = userResponse.data;

    res.json({
      message: 'User authenticated successfully!',
      user,
      tokens: { access_token, id_token }
    });
  } catch (error) {
    console.error('Error during Google OAuth:', error.response?.data || error);
    res.status(500).send('Authentication failed');
  }
});

app.listen(port, () => console.log(`🚀 Server running at http://localhost:${port}`));
