import { test, expect } from '@playwright/test';

test.describe('Operaciones básicas de tareas', () => {
  test('Cancelar y confirmar la limpieza de la lista', async ({ page }) => {
    // 1. Crear dos tareas para probar la limpieza.
    await page.goto('https://todo.uiineed.com/');
    const taskInput = page.getByRole('textbox', { name: 'Add a to-do item...' });
    for (const title of ['Tarea A', 'Tarea B']) {
      await taskInput.fill(title);
      await page.getByRole('button', { name: 'Add' }).click();
    }
    const taskItems = page.locator('.todo-item');
    await expect(taskItems).toHaveCount(2);

    // 2. Cancelar la primera solicitud de limpieza y verificar que no se borró nada.
    await page.getByRole('button', { name: 'Clear All' }).click();
    await expect(page.getByText('Confirm to clear all todo items?')).toBeVisible();
    await page.getByRole('button', { name: 'Cancel' }).click();
    await expect(page.getByText('Tarea A')).toBeVisible();
    await expect(page.getByText('Tarea B')).toBeVisible();

    // 3. Confirmar la limpieza y verificar que ya no quedan tareas activas.
    await page.getByRole('button', { name: 'Clear All' }).click();
    await page.getByRole('button', { name: 'OK' }).click();
    await expect(taskItems).toHaveCount(0);
  });
});
