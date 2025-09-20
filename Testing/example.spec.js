// @ts-check
import { test, expect } from '@playwright/test';

test('bad login test', async ({ page }) => {
  await page.goto('http://localhost:3000/auth/login');

  // Fill wrong credentials
  await page.fill('#email', 'wrong@example.com');
  await page.fill('#password', 'wrongpassword');

  // Submit the form
  await page.click('button[type=submit]');

  // Wait for redirect back to /auth/login
  await expect(page).toHaveURL('http://localhost:3000/auth/login');

  // Wait for the alert to appear
  // console.log(await page.content());

  const alert = page.locator('.alert-danger');
  await expect(alert).toContainText('Invalid email or password');
});

test('successful login test', async ({ page }) => {
  await page.goto('http://localhost:3000/auth/login');
  
  // Fill correct credentials
  await page.fill('#email', 'tjeerdkootwijk@gmail.com');
  await page.fill('#password', 'Kaasje');
  await page.click('button[type=submit]');

  // Wait for redirect to movies
  await expect(page).toHaveURL('http://localhost:3000/movies');
});


test('logout test', async ({ page }) => {
  await page.goto('http://localhost:3000/auth/login');

  // Fill correct credentials
  await page.fill('#email', 'tjeerdkootwijk@gmail.com');
  await page.fill('#password', 'Kaasje');
  await page.click('button[type=submit]');

  // Wait for redirect to movies
  await expect(page).toHaveURL('http://localhost:3000/movies');

  // Click logout link
  await page.getByRole('link', { name: 'Logout' }).click();

  // Wait for redirect back to login
  await expect(page).toHaveURL('http://localhost:3000/auth/login');
});


test('access protected route when not logged in', async ({ page }) => {
  await page.goto('http://localhost:3000/movies');
  
  // Should be redirected to login
  await expect(page).toHaveURL('http://localhost:3000/auth/login');
  const alert = page.locator('.alert-danger');
  await expect(alert).toContainText('Not logged in');
});