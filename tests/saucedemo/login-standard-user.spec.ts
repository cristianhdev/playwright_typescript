// spec: tests/saucedemo-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { loginTestCases } from './data/login-test-data';

loginTestCases.forEach(({ username, password, expectedTitle, dataTest }) => {
  test.describe(`Compra estándar y validaciones de checkout - ${username}`, () => {
    test(`Inicio de sesión de usuario ${username} con resultado esperado: ${expectedTitle}`, async ({ page }) => {
      // 1. Abrir SauceDemo en una sesión nueva y verificar los controles del login.
      await page.goto('https://www.saucedemo.com/');
      await expect(page.getByTestId("username")).toBeVisible();
      await expect(page.getByTestId("password")).toBeVisible();
      await expect(page.getByTestId("login-button")).toBeVisible();

      // 2. Ingresar las credenciales del caso.
      await page.getByTestId("username").fill(username);
      await page.getByTestId("password").fill(password);

      // 3. Enviar las credenciales y verificar el resultado esperado.
      await page.getByTestId("login-button").click();
      await expect(page).toHaveTitle('Swag Labs');
      await expect(page.getByTestId(dataTest)).toHaveText(expectedTitle);
    });
  });
  test.afterAll(async ({ page }) => {
    console.log(`Cerrando la página después de los tests para el usuario: ${username}`);
    page.close();
  });
});
