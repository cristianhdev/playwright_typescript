import { test, expect } from '@playwright/test';

test.describe('Operaciones básicas de tareas', () => {
  test('Rechazar el alta de una tarea vacía', async ({ page }) => {
    // 1. Abrir la aplicación con la lista vacía.
    await page.goto('https://todo.uiineed.com/');

    // 2. Intentar agregar sin contenido y verificar el mensaje de validación.
    await page.getByRole('button', { name: 'Add' }).click();
    await expect(page.getByText('Please enter content!')).toBeVisible();
    await expect(page.locator('.todo-item')).toHaveCount(0);
  });
});
