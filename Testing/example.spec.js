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


test('login and create movie', async ({ page }) => {
  await page.goto('http://localhost:3000/auth/login');
  
  // Fill correct credentials
  await page.fill('#email', 'tjeerdkootwijk@gmail.com');
  await page.fill('#password', 'Kaasje');
  await page.click('button[type=submit]');

  // Wait for redirect to movies
  await expect(page).toHaveURL('http://localhost:3000/movies');
  await page.click('a.btn-primary:has-text("Add movie")');
  
  // Wait for redirect to create movie page
  await expect(page).toHaveURL('http://localhost:3000/movies/add');
  await page.fill('#title', 'Test Movie');
  await page.fill('#description', 'This is a test movie.');
  await page.fill('#release_year', '2023');
  await page.fill('#rental_duration', '5');
  await page.fill('#rental_rate', '2.99');
  await page.fill('#length', '120');
  await page.fill('#replacement_cost', '19.99');
  await page.fill('#rating', 'PG');
  await page.fill('#special_features', 'Behind the Scenes');
  await page.selectOption('#language', { label: 'English' });
  await page.click('button[type=submit]');

  // Wait for redirect back to movies
  await expect(page).toHaveURL('http://localhost:3000/movies');
  const successAlert = page.locator('.alert-success');
  await expect(successAlert).toContainText('Movie created successfully');
});

test('login with update movie', async ({ page }) => {
  await page.goto('http://localhost:3000/auth/login');
  
  // Fill correct credentials
  await page.fill('#email', 'tjeerdkootwijk@gmail.com');
  await page.fill('#password', 'Kaasje');
  await page.click('button[type=submit]');

  // Wait for redirect to movies
  await expect(page).toHaveURL('http://localhost:3000/movies');
  
  // Wait for the details button to be visible and click it
  const detailsBtn = page.locator('a.btn-primary[href*="/movies/"][href$="/details"]');
  await expect(detailsBtn.first()).toBeVisible();
  await detailsBtn.first().click();

  // Wait for redirect to movie details page
  await expect(page).toHaveURL(/http:\/\/localhost:3000\/movies\/\d+\/details/);

  await page.fill('#title', 'Test Movie');
  await page.fill('#description', 'This is a test movie.');
  await page.fill('#release_year', '2023');
  await page.fill('#rental_duration', '5');
  await page.fill('#rental_rate', '2.99');
  await page.fill('#length', '120');
  await page.fill('#replacement_cost', '19.99');
  await page.fill('#rating', 'PG');
  await page.fill('#special_features', 'Behind the Scenes');
  await page.selectOption('#language', { label: 'English' });
  await page.click('button[type=submit]');

  // Wait for redirect back to movies
  await expect(page).toHaveURL(/http:\/\/localhost:3000\/movies\/\d+\/details/);
  const successAlert = page.locator('.alert-success');
    await successAlert.waitFor({ state: 'visible', timeout: 3000 });
  await expect(successAlert).toContainText('Movie updated successfully');

});


test('login and delete movie', async ({ page }) => {
  await page.goto('http://localhost:3000/auth/login');

  // Fill correct credentials
  await page.fill('#email', 'tjeerdkootwijk@gmail.com');
  await page.fill('#password', 'Kaasje');
  await page.click('button[type=submit]');

  // Wait for redirect to movies
  await expect(page).toHaveURL('http://localhost:3000/movies');
  // Wait for the delete button to be visible and click it
  const deleteBtn = page.locator('button.btn-danger:has-text("Delete")');
  await expect(deleteBtn.first()).toBeVisible();
  
  // Listen for the 2 dialog and accept it
  page.on('dialog', dialog => dialog.accept());
  await deleteBtn.first().click();
});