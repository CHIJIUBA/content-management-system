import { app } from '../../../src/index'; // Assuming you have an Express app exported from app.ts
import request from 'supertest';
// import jwt from 'jsonwebtoken';
import { describe, expect, test } from '@jest/globals';

describe('Authentication Tests', () => {
  const user = { email: 'chijiuba@gmail.com', password: 'chijiuba123' };
  const user2 = {
    email: 'chijiuba@gmail.com',
    password: 'chijiuba123',
    firstName: 'Chijiuba',
    lastName: 'Victory'
  };
  let token;

  /**
   * Test case if a user already exists
   * This test checks if the signup fails when a user with the same email already exists.
   * It sends a POST request to the /auth/register endpoint with user2 details.
   * It expects a 400 status code and a message indicating the user already exists.
   */
  it('should not sign up if user already exists', async () => {
    const res = await request(app.app).post('/auth/register').send(user2);
    expect(res.statusCode).toBe(409);
    expect(res.body.message).toBe('User already exist');
  });

  /**
   * Test case for user log in
   * This test checks if a user can log in successfully.
   * It sends a POST request to the /auth/login endpoint with user details.
   * It expects a 200 status code and a success message in the response.
   * It also stores the access token for further tests.
   */
  it('should login successfully and return token', async () => {
    const res = await request(app.app).post('/auth/login').send(user);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.accessToken).toBeDefined();
    expect(res.body.message).toBe('Logged in successful');
    token = res.body.data.accessToken;
  });

  /**
   * Test case for user log in with incomplete details
   * This test checks if the login fails when the user provides incomplete details.
   * It sends a POST request to the /auth/login endpoint with only the email.
   * It expects a 500 status code and a message indicating missing fields.
   */
  it('should not sign up with missing fields', async () => {
    const res = await request(app.app).post('/auth/login').send({ email: 'testuser2' });
    expect(res.statusCode).toBe(500);
  });

  /**
   * Test case for user register with incomplete details
   * This test checks if the registration fails when the user provides incomplete details.
   * It sends a POST request to the /auth/register endpoint with only the email.
   * It expects a 500 status code and a message indicating missing fields.
   */
  it('should not register with missing fields', async () => {
    const res = await request(app.app).post('/auth/registter').send({ email: 'testuser2' });
    expect(res.statusCode).toBe(500);
  });

  /**
   * Test case for user log in with invalid credentials
   * This test checks if the login fails when the user provides invalid credentials.
   * It sends a POST request to the /auth/login endpoint with incorrect password.
   * It expects a 500 status code and a message indicating invalid credentials.
   */
  it('should not log in with invalid credentials', async () => {
    const res = await request(app.app)
      .post('/auth/login')
      .send({ email: 'somegiberis@emial.com', password: 'wrongpassword' });
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('User not found');
  });

  /**
   * Test case for accessing a protected route
   * This test checks if a user can access a protected route with a valid token.
   * It sends a GET request to the /protected endpoint with the token in the Authorization header.
   * It expects a 200 status code and a successful message.
   */
  it('should access protected route with valid token', async () => {
    const res = await request(app.app).get('/post/1').set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain('Post retrieved successfully');
  });

  /**
   * Test case for accessing a protected route with an invalid token
   * This test checks if a user cannot access a protected route with an invalid token.
   * It sends a GET request to the /protected endpoint with an invalid token in the Authorization header.
   * It expects a 500 status code and a message indicating the token is invalid.
   */
  it('should reject protected route with invalid token', async () => {
    const res = await request(app.app)
      .get('/post/1')
      .set('Authorization', 'Bearer invalidtoken123');
    expect(res.statusCode).toBe(500);
  });
});
