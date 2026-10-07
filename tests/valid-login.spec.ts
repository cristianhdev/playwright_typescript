// spec: SauceDemo - Escenario base
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Acceso válido', () => {
  test('Valid Login', async ({ page }) => {
    // 1. Abrir la página de inicio de sesión de SauceDemo.
    await page.goto('https://www.saucedemo.com/');

    // 2. Verificar que se muestran el formulario de acceso y sus campos de usuario y contraseña.
    await expect(page.getByRole('form', { name: 'Login' })).toBeVisible();
    await expect(page.locator('[data-test="username"]')).toBeVisible();
    await expect(page.locator('[data-test="password"]')).toBeVisible();

    // 3. Ingresar standard_user como usuario.
    await page.locator('[data-test="username"]').fill('standard_user');

    // 4. Ingresar secret_sauce como contraseña.
    await page.locator('[data-test="password"]').fill('secret_sauce');

    // 5. Seleccionar el botón Login.
    await page.locator('[data-test="login-button"]').click();

    // 6. Verificar que se muestra la página de productos con el título Products.
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  });
});
